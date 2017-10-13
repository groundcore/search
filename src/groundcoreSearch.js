/*!
 * Groundcore Search (jQuery Plugin)
 * version: 0.2.0
 * Requires jQuery v2.1 or later
 * Project repository: https://github.com/groundcore/form
 *
 * Copyright 2017 Alfredo Tranchedone
 *
 * Dual licensed under the LGPL-2.1+ or MIT licenses

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */


(function ($) {

    /**
     *
     * Groundcore Search
     *  a jQuery plugin
     *
     * Requirements: Bootstrap 3+
     *
     * Example:
     *      $('#search').groundcoreSearch({
             *          searchUrl: /repo/data.json
             *      });
     */
    $.fn.groundcoreSearch = function (options) {

        /**
         * --------------------------
         * Default settings
         * --------------------------
         */

        var defaults = {
            searchUrl: false,           // source data url
            appendResultTo: false,      // DOM|false   If false, plugin will create a div next to parent .form-group
            resultWrapperAttrs: {
                id: 'groundcore-search-result',
                class: 'list-group'
            },
            resultWrapperCss: {},
            method: 'GET',
            data: {},
            limit: 25,
            searchConditions: function (item, expression) {
                return (item.nome.search(expression) != -1 || item.comune.nome.search(expression) != -1)
            },
            renderItem: function (item) {
                return '<div>' + item.nome + '</div>';
            },
            renderNoResults: function(){
                return '<ul class="list-group"><li class="list-group-item">Nessun risultato.</li></ul>';
            }
        }

        var settings = $.extend(true, {}, defaults, options);

        var searchResultWrapper = $("<div />")
                .attr(settings.resultWrapperAttrs)
                .css(settings.resultWrapperCss);

        var dataContainer;


        /**
         * --------------------------
         * Bootstrap
         * --------------------------
         */

        init(this);



        /**
         * --------------------------
         * Listeners
         * --------------------------
         */

        this.on('keyup', function (e) {

            if (e.keyCode == 13)
                e.preventDefault();

            /* allowed input */
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

            var q = this.value;

            if (q.trim().length < 3) {
                searchResultWrapper.empty();
            }

            if (q.trim().length > 2 && q.trim().length < 30) {
                if (regex.test(str) || e.keyCode == 8) {
                    make_call(q);
                }
            }

        });


        this.on('groundcoreSearch:data:loaded', function (e) {
            $(this).attr('disabled', false);
        })




        /**
         * --------------------------
         * Private Methods
         * --------------------------
         */

        function make_call(q) {

            var searchField = q;
            var expression = new RegExp(searchField, "i");

            var html = '';

            var i = 0;
            var total_result = 0;
            $.each(dataContainer, function (k, v) {

                if (settings.searchConditions(v, expression)) {
                    html += settings.renderItem(v)
                    total_result++;
                }

                i++;

            });

            if(total_result == 0){
                html = settings.renderNoResults();
            }

            searchResultWrapper.html(html);

        }



        function init(_this) {

            $(_this).attr('disabled', true);

            if (settings.appendResultTo) {
                $(settings.appendResultTo).append(searchResultWrapper);
            } else {
                this.parents('.form-group').after(searchResultWrapper);
            }

            if (settings.searchUrl == false) {
                alert('[groundcoreSearch] Option searchUrl not set.');
            }

            load_data(_this);

        }



        function load_data(_this) {

            var _req = $.ajax({
                ifModified: true,
                dataType: "json",
                data: settings.data,
                method: settings.method,
                url: settings.searchUrl
            });

            _req.done(function (data) {

                dataContainer = data;
                _this.trigger('groundcoreSearch:data:loaded')

            });

            _req.fail(function (err) {
                console.log(err.message);
                alert(err.message);
            });


        }


    };

}(jQuery));