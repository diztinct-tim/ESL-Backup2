export default class PageManager {
    before(next) {
        next();

        // BREADCRUMB BACK MOBILE
        function changeMobileBreadcrumb(){
            if( $(window).width() < 768 ){
                $(".breadcrumbs > li:nth-last-child(2) > a").text("Previous Page");
                $(".breadcrumbs > li:nth-last-child(2)").addClass("back-arrow");
            } else {
                $(".breadcrumbs > li:nth-last-child(2)").removeClass("back-arrow");
            }
        }
        changeMobileBreadcrumb();

        // Format Desk Nav
        function formatDesktopNavigation(){
            if($(window).width() > 800){
                $("#menu ul li a").removeClass("has-subMenu");
                $("#menu ul li a").removeAttr("aria-controls");
                $("#menu ul li a").removeAttr("data-collapsible");
                $("#menu ul li div").removeClass("has-subMenu");
                $("#menu ul li div").removeAttr("aria-controls");
                $("#menu ul li div").removeAttr("data-collapsible");
            }
        }
        formatDesktopNavigation();

        // Add static divs to dynamic dropdown menus 
        // HTML is located in header.html
        function appendPopCatsToMenu(){
            $(".pop-cats-menu.Electrical").insertAfter(".pop-cats.Electrical > h5.desk-only");
            $(".pop-cats-menu.Home-Outdoor").insertAfter(".pop-cats.Home-Outdoor > h5.desk-only");
            $(".pop-cats-menu.Lamps-Ballasts").insertAfter(".pop-cats.Lamps-Ballasts > h5.desk-only");
            // $(".pop-cats-menu.LED.Flashlights").insertAfter(".pop-cats.LED.Flashlights > h5.desk-only");
            $(".pop-cats-menu.LED.Lamps").insertAfter(".pop-cats.LED.Lamps > h5.desk-only");
            // $(".pop-cats-menu.LED.Rope.Lights").insertAfter(".pop-cats.LED.Rope.Lights > h5.desk-only");
            $(".pop-cats-menu.Lighting.Fixtures").insertAfter(".pop-cats.Lighting.Fixtures > h5.desk-only");
        }
        appendPopCatsToMenu();

    }

    loaded(next) {
        next();


        $(".navUser-item.navUser-item--account").on("click", function(){
            $(".account-dd").slideToggle();
        });

        $("h5.footer-info-heading").on("click", function(){
            if($(window).width() < 801){
                $(this).toggleClass("open");
                $(this).next("ul").slideToggle();
            }
        });


    }

    after(next) {
        next();

    }

    type() {
        return this.constructor.name;
    }
}
