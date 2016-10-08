$(document).ready(function() {
  $('#agencias-message').hide();
  $('#agencias-preview').hide();
  $('#agencias-404').hide();
  $('.agencias-show').click(function() {
    var src = $(this).data('src');
    $(this).parent().parent().find('span').css('color', 'black');
    $(this).parent().find('span').css('color', 'blue');
    $('#agencias-preview').hide();
    $('#agencias-message').text('Cargando...');
    $('#agencias-message').show();
    $('#agencias-preview').attr('src', src)
    .on('load', function() {
      $('#agencias-message').text(src);
      $('#agencias-preview').show();
    })
    .on('error', function() {
      $('#agencias-message').text('No disponible :(');
      $('#agencias-message').show();
    });
  });
  $('.agencias-delete').click(function() {
    var src = $(this).data('src');
    var result = window.confirm('¿Esta seguro que desea eliminar la imagen?');
    if (result) {
      window.location.href = `/agencias/delete?link=${src}`
    }
  });
  $('.agencias-fix').click(function() {
    var src = $(this).data('src');
    window.location.href = `/agencias/fix?link=${src}`
  });
});
