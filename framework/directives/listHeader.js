/**
 * @ngdoc directive
 * @id list-header
 * @name ons-list-header
 * @description
 *   [en]Header element for list items. Must be put inside ons-list component.[/en]
 *   [ja]リスト要素に使用するヘッダー用コンポーネント。ons-listと共に使用します。[/ja]
 * @seealso ons-list [en]ons-list component[/en][ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-item [en]ons-list-item component[/en][ja]ons-list-itemコンポーネント[/ja]
 * @guide UsingList [en]Using lists[/en][ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list header.[/en]
 *   [ja]ヘッダーの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListHeader', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function() {
        return function(scope, element, attrs) {
          var listHeader = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, listHeader);

          element.data('ons-listHeader', listHeader);

          scope.$on('$destroy', function() {
            listHeader._events = undefined;
            $onsen.removeModifierMethods(listHeader);
            element.data('ons-listHeader', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);
          element.addClass('list__header ons-list-header-inner');
          element.addClass(templater('list__header--*'));

          $onsen.addModifierMethods(listHeader, 'list__header--*', element);

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
