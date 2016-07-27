$(function(){

    $(".featured-categories > ul > li > span").on("click", function(){
    	if($(window).width() < 801){
	        console.log("clicked");
	        $(this).toggleClass("open");
	        $(this).next("ul").slideToggle();
	    }
    });






});


import PageManager from '../page-manager';

export default class Home extends PageManager {}
