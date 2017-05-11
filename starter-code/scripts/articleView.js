'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from an attribute in `this` article element,
      //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    if ($(this).val()) {
      var $selection = $(this).val();
      $('article').hide();
      $('[data-author="'+$selection+'"]').fadeIn(750);
    } else {
      $('article').fadeIn(750);
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    if ($(this).val()) {
      var $selection = $(this).val();
      $('article').hide();
      $('[data-category="'+$selection+'"]').fadeIn(750);
    } else {
      $('article').fadeIn(750);
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleMainNav = function() {

  $('.main-nav li').on('click', function() {
    var $selectorTab = $(this).attr('data-content');
    $('.tab-content').hide();
    $('section#'+$selectorTab).fadeIn(750);
  })

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};
articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  $('.read-on').on('click', function() {
    event.preventDefault();
    console.log('outside');
    $(this).siblings('.article-body').children().show();
    if($(this).attr('data-read') === 'read'){
      console.log('inside');
      $(this).siblings('.article-body').children().show();
      $(this).attr('data-read', 'hide');
      $(this).html('hide &larr;');
    }else{
      $('.article-body *:nth-of-type(n+2)').hide();
      $(this).html('Read on &rarr;');
      $(this).attr('data-read', 'read');
    }
  });
};
  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.handleMainNav();
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.setTeasers();
})
