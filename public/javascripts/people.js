var Actions = {
  connectAddForm: function() {
    $("form.people").submit(function() {
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/people',
        data: $(this).serialize(), 
        success: function(json) {
          $('ul.people').append('<li><span class="name">' + html_sanitize(json.person.name) + '</span> <a href="/people/' + json.person.id + '/delete" class="delete">delete</a></li>');
          $('#person_name').val('');
        }
      });
      return false;
    });
  },
  connectDeleteLinks: function() {
    $('ul.people').find('a.delete').live('click', function() {
      var li = $(this).parent();
      if (confirm('Are you sure you want to delete the person "' + li.find('span.name').text() + '"?')) {
        $.ajax({
          type: 'post',
          dataType: 'json',
          url: this.href.replace(/\/delete/, ''),
          data: {'_method': 'delete'},
          success: function(json) {
            li.slideToggle();
          }
        });
      }
      return false;
    });
  }
}

$(document).ready(function(){
  Actions.connectAddForm();
  Actions.connectDeleteLinks();
});