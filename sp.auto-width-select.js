/**!
 * @author Steve Piron <https://twitter.com/stevepiron>
 * @requires jQuery
 *
 * A jQuery plugin that resizes selects to to width of their selected option.
 */
(function( $ ) {

    var defaults;
    var params;

    // ====================================================================== //
    // Functions
    // ====================================================================== //

    /**
     * 1. Create a dummy `span` element using the ame text as the selected
     *    (current) option.
     * 2. Append it to the body to get its width, then remove it.
     * 3. Resize the original select.
     */
    function resizeIt( $select ) {
        /* [1] */
        var text = $select.find('option:selected').text();
        var className = (params.classes) ? ' class="'+params.classes+'"' : '';
        var $dummyOption = $('<span'+className+'>').html(text);

        /* [2] */
        $dummyOption.appendTo('body');
        var width = $dummyOption.width();
        $dummyOption.remove();

        /* [3] */
        $select.width(width + params.iconWidth);
    }

    // ====================================================================== //
    // Plugin
    // ====================================================================== //

    $.fn.spAutoWidthSelect = function( options ) {

        /**
         * Note: using `return` keeps jQuery's chaining possibility
         */
        return this.each(function() {

            var $this = $(this);

            defaults = {
                iconWidth: 0,
                classes: false
            };

            params = $.extend( defaults, options );

            // ============================================================== //
            // On ready
            // ============================================================== //

            resizeIt( $this );

            // ============================================================== //
            // On change
            // ============================================================== //

            $this.on('change', function(){
                resizeIt( $(this) );
            });

        });
    };

}( jQuery ));
