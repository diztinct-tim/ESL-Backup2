/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                History.replaceState('', document.title, window.location.pathname);
            }
        });

        $("ul.productView-thumbnails > li:first-child > a").addClass("is-active");

        $(".bottom-pp-tabs > h5:first-child").addClass("open");
        $("div.prod-desc").css("display","block");

        function checkDescriptionHeight(){
            if( $(".desk-tainer").height() > 80 ){
                $(".view-more-wrap").css("display","block");
                $(".desc-tainer").addClass("hide-overflow");
            }
        }
        checkDescriptionHeight();

        if($(".energy-calc-large").length){
            var largeCalc = $(".energy-calc-large").detach();
            largeCalc.appendTo(".e-s-c");
            $(".main-description").addClass("calc-present");
        } else {
            $(".e-s-c-heading").hide();
            $(".e-s-c").hide();
        }

        if($(".energy-calc-small").length){
            var smallCalc = $(".energy-calc-small").detach();
            smallCalc.appendTo(".energy-savings-calc");
            $(".energy-calc-small").hide();
            $(".main-description").addClass("calc-present");
        }
        




        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $(".productView-image").mouseenter(function(){
            $(".productView-image").addClass("zoomHovered");
        }).mouseleave(function(){
            $(".productView-image").removeClass("zoomHovered")
        }); 

        $(".why-shop-pp li").on("click", function(){
            if($(window).width() > 800){
                $(".why-shop-pp").toggleClass("expanded");
            }
        });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

         $(".extended-savings-calc").on("click", function(e){
            e.preventDefault();
            $("body, html").animate({scrollTop:$(".e-s-c-heading").offset().top},0);
            $(".e-s-c-heading").addClass("open");
            $(".e-s-c").show();
            $(".energy-calc-large").css("display","block");
        });


        $(".e-s-c-heading").on("click", function(){
            $(".e-s-c").slideToggle();
            $(".energy-calc-large").css("display","block");
        });


        $(".extended-savings-calc").on("click", function(e){
            e.preventDefault();
            $(".e-s-c-heading").addClass("open");
            $(".e-s-c").show();
        });
        

        $(".bottom-pp-tabs h5").on("click", function(){
            $(this).toggleClass('open');
            $(this).next("div").slideToggle();
        });

        $(".energy-savings-calc").on("click", function(e){
            e.preventDefault();
            $(".energy-calc-small").slideToggle();
        });



        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
