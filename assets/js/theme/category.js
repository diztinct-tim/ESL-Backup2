import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';

$(function(){
    function mobilefyPagination(pageLength, currentPage){
        var pageLength = $(".bottom-pagination ul li").length;
        if(pageLength > 2){
            console.log("inside function");
            console.log('currentPage = ' + currentPage);
            console.log("pagination length = " + pageLength);
            $("li.pagination-item").each(function(idx){
                $(this).removeClass("hide-me");
                console.log("data = " + $(this).data("pageNum"));
                if($(this).data("pageNum") > currentPage + 1 || $(this).data("pageNum") < currentPage - 1){
                    $(this).addClass("hide-me");
                }
            })
        }
    }

    if( $("div.page").hasClass("category-page") ){
        var pageLength = $(".bottom-pagination ul li").length;
        if(pageLength){
            var currentPage = $(".pagination-item.pagination-item--current").data().pageNum;
        }
        mobilefyPagination(pageLength, currentPage);
        if(pageLength){
            var currentPage = $(".pagination-item.pagination-item--current").data("pageNum");
            var lastPage = $(".pagination-item:last-child").data("pageNum");
            if( currentPage == '1'){
                $(".pagination-item.pagination-item--next").addClass("center-me");
            } else if (currentPage == lastPage){
                $(".pagination-item.pagination-item--previous").addClass("center-me");
            }
        }
    }

    function moveBottomSEO(){
        if($("#product-listing-container").length){
            $(".bottom-seo").appendTo("#product-listing-container")
        }
    }
    moveBottomSEO();
})

export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });







    }
}
