// Jaro winkler distance
String.prototype.distance=function(c){var a;a=this;var h,b,d,k,e,g,f,l,n,m,p;a.length>c.length&&(c=[c,a],a=c[0],c=c[1]);k=~~Math.max(0,c.length/2-1);e=[];g=[];b=n=0;for(p=a.length;n<p;b=++n)for(h=a[b],l=Math.max(0,b-k),f=Math.min(b+k+1,c.length),d=m=l;l<=f?m<f:m>f;d=l<=f?++m:--m)if(null==g[d]&&h===c[d]){e[b]=h;g[d]=c[d];break}e=e.join("");g=g.join("");if(d=e.length){b=f=k=0;for(l=e.length;f<l;b=++f)h=e[b],h!==g[b]&&k++;b=g=e=0;for(f=a.length;g<f;b=++g)if(h=a[b],h===c[b])e++;else break;a=(d/a.length+
d/c.length+(d-~~(k/2))/d)/3;a+=0.1*Math.min(e,4)*(1-a)}else a=0;return a};

// Background color helper
function getBg(value){
  if(value < 0.85) return "rgba(255, 0, 0, 0.3)"
  if(value < 0.91) return "rgba(255, 255, 0, 0.3)"
  return "rgba(0, 255, 0, 0.3)"
}

// Modify list item on drop
$('.drop').on('drop dragdrop',function(e){
    var pname = e.originalEvent.dataTransfer.getData('name');
    var id = e.originalEvent.dataTransfer.getData('id');

    var name = $(this).data('name')
    var distance = name.distance(pname)

    $(this).css('backgroundColor', getBg(distance))
    $(this).find('.pname').text(pname)
    $(this).find('.match').text('('+distance.toFixed(2)+')')
    $(this).data('pname', name)
    $(this).data('fecid', id)
    $('.submit').removeAttr('disabled')
});
$('.drop').on('dragenter, dragover',function(event){
    event.preventDefault();
})
$('.drag').on('dragstart', function(e) {
    e.originalEvent.dataTransfer.setData('name', $(e.target).data('name'))
    e.originalEvent.dataTransfer.setData('id', $(e.target).data('id'))
})

// Search bar
$('#search').on('keyup', function(){
  var q = $(this).val()

  $('.drag').each(function(){
    if($(this).data('name').toUpperCase().indexOf(q.toUpperCase()) != -1) {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
})

// Send data on submit
$('.submit').on('click', function(){
  $('.submit').attr('disabled', 'disabled')
  var candidates = []
  $('.drop').each(function(){ candidates.push($(this).data()) })
  var data = {candidates: candidates}
  console.log(data)
  $.ajax({
    url: '/',
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  })
})
