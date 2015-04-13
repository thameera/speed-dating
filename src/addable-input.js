/*
 * Addable inputs
 */
;(function($, window) {
  var defaults = {
    initValues: [],
    movable: true
  };

  function Plugin(element, params) {
    this.w = $(window);
    this.el = $(element);
    this.options = $.extend({}, defaults, params);
    this.init();
  }

  Plugin.prototype.init = function() {
    var self = this;
    self.count = 0;
    self.nextId = 0;

    self.addLine(-1);

    self.options.initValues.forEach(function(item) {
      self.el.find('.addable-text').last().val(item);
      self.addLine(self.nextId - 1);
    });
  };

  Plugin.prototype.addLine = function(parentPos) {
    var self = this;
    var opts = self.options;
    var pos = self.nextId;

    var $wrapper = $('<div>', {class: 'addable-row', id: 'addable-pos-' + pos});
    // Text input
    var $text = $('<input>', {type: 'text', class: 'addable-text'}).appendTo($wrapper);
    // Add button
    var $addBtn = $('<button>', {type: 'button', class: 'addable-add pure-button button-small'}).appendTo($wrapper);
    $('<i>', {class: 'fa fa-plus'}).appendTo($addBtn);;
    // Remove button
    var $removeBtn = $('<button>', {type: 'button', class: 'addable-add pure-button button-small'}).appendTo($wrapper);
    $('<i>', {class: 'fa fa-minus'}).appendTo($removeBtn);;
    // Move up button
    var $upBtn = $('<button>', {type: 'button', class: 'addable-up pure-button button-small'}).appendTo($wrapper);
    $('<i>', {class: 'fa fa-chevron-up'}).appendTo($upBtn);;
    // Move down button
    var $downBtn = $('<button>', {type: 'button', class: 'addable-down pure-button button-small'}).appendTo($wrapper);
    $('<i>', {class: 'fa fa-chevron-down'}).appendTo($downBtn);;

    // Add the new elements to correct position
    if (parentPos === -1) {
      self.el.append($wrapper);
    } else {
      self.el.find('#addable-pos-' + parentPos).after($wrapper);
    }

    $addBtn.click(function() {
      return self.onAddClick(pos);
    });

    $removeBtn.click(function() {
      return self.onRemoveClick(pos);
    });

    $upBtn.click(function() {
      return self.onMoveUpClick(pos);
    });

    $downBtn.click(function() {
      return self.onMoveDownClick(pos);
    });

    $text.on('input', function() {
      return self.onTextChange();
    });
    $text.keydown(function(e) {
      if (e.keyCode === 13) {
        // Add a new line on Enter
        return self.onAddClick(pos);
      }
    });
    $text.focus();

    self.count += 1;
    self.nextId += 1;
  };

  Plugin.prototype.onAddClick = function(pos) {
    this.addLine(pos);
  };

  Plugin.prototype.onRemoveClick = function(pos) {
    if (this.count === 1)
      return;

    this.el.find('#addable-pos-' + pos).remove();
    this.count -= 1;
    this.onTextChange();
  };

  Plugin.prototype.onMoveUpClick = function(pos) {
    var $div = this.el.find('#addable-pos-' + pos);
    $div.insertBefore($div.prev());
    this.onTextChange();
  };

  Plugin.prototype.onMoveDownClick = function(pos) {
    var $div = this.el.find('#addable-pos-' + pos);
    $div.insertAfter($div.next());
    this.onTextChange();
  };

  Plugin.prototype.onTextChange = function() {
    var vals = [];
    this.el.find('.addable-text').map(function() {
      vals.push( $(this).val() );
    });
    this.el.trigger('textChange', [vals]);
  };

  $.fn.addableInput = function(params) {
    if (!this.data('addable-inputs')) {
      return this.data('addable', new Plugin(this, params));
    } else {
      return this;
    }
  };

})(jQuery, window);

