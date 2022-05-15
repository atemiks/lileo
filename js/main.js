$(document).ready(function() {
    var windowWidth = window.innerWidth;
    var body = $('body');
    var modal_counter = 0;

    /* functions */
    function openOffcanvas() {
        body.addClass('open');
        $('.offcanvas').addClass('open');
    }

    function closeOffcanvas() {
        body.removeClass('open');
        $('.offcanvas').removeClass('open');
    }

    function openHeaderSearch() {
        body.addClass('open');
        $('.header-search').addClass('open');
    }

    function closeHeaderSearch() {
        body.removeClass('open');
        $('.header-search').removeClass('open');
    }

    // collapse filter
    function openCatalogMenu() {
        var toggleButton = $('.menu-toggler');
        var menu = $('.catalog-menu');

        body.toggleClass('open');
        toggleButton.toggleClass('active');
        menu.slideToggle();
    }

    function closeCatalogMenu() {
        var toggleButton = $('.menu-toggler');
        var menu = $('.catalog-menu');

        body.removeClass('open');
        toggleButton.removeClass('active');
        menu.slideUp();
    }

    function openCatalogFilter() {
        var toggleButton = $('.filter-toggler');
        var filter = $('.catalog-filter');

        body.toggleClass('open');
        filter.slideToggle();

        // update custom scrollbar
        setTimeout(function(){
            $(".nano").nanoScroller();
        }, 100);
    }


    function closeCatalogFilter() {
        var filter = $('.catalog-filter');

        body.removeClass('open');
        filter.slideUp();
    }

    function collapseFilter() {
        $('.filter-block').removeClass('in');
        $('.filter-content').slideUp();
    }

    // uncollapse filter
    function uncollapseFilter() {
        $('.filter-block').addClass('in');
        $('.filter-content').slideDown();
    }

    // uncollapse first element filter
    function uncollapseFirstElementFilter() {
        $('.filter-block').first().addClass('in');
        $('.filter-content').first().slideDown();
    }

    // move catalog menu
    function moveCatalogMenu() {
        var container = $('.catalog-menu');
        var mobileInsert = $('#catalog-mobile-controls');
        var desktopInsert = $('.catalog-aside');

        if (windowWidth <= 991) {
            container.appendTo(mobileInsert);
        } else {
            container.appendTo(desktopInsert);
        }

        // update custom scrollbar
        setTimeout(function(){
            $(".nano").nanoScroller();
        }, 100);
    }

    // move catalog filter
    function moveCatalogFilter() {
        var container = $('.catalog-filter');
        var mobileInsert = $('#catalog-mobile-controls');
        var desktopInsert = $('.catalog-aside');

        if (windowWidth <= 991) {
            container.appendTo(mobileInsert);
        } else {
            container.appendTo(desktopInsert);
        }
    }

    function layoutCatalog() {
        moveCatalogMenu();
        moveCatalogFilter();
    }


    // move product bag
    function moveProductBag() {
        var container = $('#product-bag');
        var mobileInsert = $('#product-attributes');
        var desktopInsert = $('#product-bar');

        if (windowWidth <= 991) {
            container.insertAfter(mobileInsert);
        } else {
            container.prependTo(desktopInsert);
        }
    }

    // move product advantages
    function moveProductAdvantages() {
        var container = $('#product-advantages');
        var mobileInsert = $('#product-content');
        var desktopInsert = $('#product-bag');

        if (windowWidth <= 991) {
            container.prependTo(mobileInsert);
        } else {
            container.insertAfter(desktopInsert);
        }
    }

    // move product description
    function moveProductDescription() {
        var container = $('#product-description');
        var mobileInsert = $('#product-content');
        var desktopInsert = $('#product-sizes');

        if (windowWidth <= 991) {
            container.prependTo(mobileInsert);
        } else {
            container.insertAfter(desktopInsert);
        }
    }

    // move product collections
    function moveProductCollections() {
        var container = $('#product-collections');
        var mobileInsert = $('#product-tags');
        var desktopInsert = $('#product-advantages');

        if (windowWidth <= 991) {
            container.insertAfter(mobileInsert);
        } else {
            container.insertAfter(desktopInsert);
        }
    }

    // generate product page layout
    function layoutProduct() {
         moveProductBag();
         moveProductDescription();
         moveProductAdvantages();
         moveProductCollections();
    }


    function layoutProductPreview() {
        $('.product-preview').each(function() {
            var container = $(this);
            var attributes = container.find('.product-attributes');
            var bag = container.find('.product-bag');
            var bar = container.find('.product-preview-bar');

            if (windowWidth <= 991) {
                bag.insertAfter(attributes);
            } else {
                bag.prependTo(bar);
            }
        })
    }

    // generate product page layout
    function layoutCart() {
        var cartTotal = $('#cart-total');
        var cartAside = $('#cart-aside');
        var cartCheckout = $('#checkout');

        if (windowWidth <= 991) {
            cartTotal.insertBefore(cartCheckout);
        } else {
            cartTotal.prependTo(cartAside);
        }
    }

    //  create slider product collections
    function createSliderProductCollections() {
        $('.swiper-collections').each(function (_, container) {
            var jContainer = $(container);
            new Swiper(jContainer, {
                slidesPerView: 2,
                navigation: {
                    nextEl: jContainer.find('.swiper-button-next'),
                    prevEl: jContainer.find('.swiper-button-prev'),
                },

                breakpointsInverse: true,
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 4
                    }
                }
            });
        });
    }

    // create slider viewed
    function createSliderViewed() {
        $('.swiper-viewed').each(function (_, container) {
            var jContainer = $(container);
            new Swiper(jContainer, {
                slidesPerView: 2,
                navigation: {
                    nextEl: jContainer.find('.swiper-button-next'),
                    prevEl: jContainer.find('.swiper-button-prev'),
                },

                breakpointsInverse: true,
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3
                    }
                }
            });
        });
    }

    //  destroy slider
    function destroySlider(slider) {
        $(slider).each(function(index, element){
            if (typeof element.swiper != 'undefined' && element.swiper != null) {
                element.swiper.destroy();
            }
        })
    }

     // Add smooth scrolling to all links
    $(".smooth-scroll").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


    // custom select
    $('.custom-select').each(function() {  
        var $p = $(this).parent();
        $(this).select2({  
            minimumResultsForSearch: Infinity,
            dropdownParent: $p  
        }) 
    })

    // custom number input
    $(".custom-number").append('<div class="inc button"><i class="icon-plus" ></i></div><div class="dec button"><i class="icon-minus" ></i></div>');
    
    $(".custom-number .button").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });


    // custom placeholder
    $('.custom-field input').on('input', function() {
        var $field = $(this).closest('.custom-field');
        if (this.value) {
            $field.addClass('not-empty');
        } else {
            $field.removeClass('not-empty');
        }
    })

    // custom scrollbar
    $(".nano").nanoScroller({
        alwaysVisible: true,
        sliderMinHeight: 104,
        sliderMaxHeight: 104
    })

    // size tooltip
    $('.product').tooltip({
        items: '.tooltip-hint',
        show: {effect: 'explode', duration: 10},
        hide: {effect: 'explode', duration: 10},
        position: {my: "center bottom-5", at: "left top", collision: "flipfit"},
        content: function () {
            if ( !isMobile() ) {
                var element, contentContainer;
                var content = '';
                element = $(this);
                contentContainer = element.find('.tooltip-data');
                if (contentContainer.length > 0) {
                    content = contentContainer.html();
                } else {
                    content = element.attr('title');
                }
            }

            return content;
        }
    });

    // close open modals before show another
    $('.modal').on('show.bs.modal', function () {
        modal_counter++;
        $('.modal').not($(this)).each(function () {
            $(this).modal('hide');
        })
    })

    $('.modal').on('hidden.bs.modal', function () {
        modal_counter--;
        if(modal_counter) {
            $('body').addClass('modal-open');
        }
        else {
            $('body').removeClass('modal-open');
        }
    });

    // mobile search
    $('.search-toggler').on('click', function(e) {
        e.preventDefault();

        openHeaderSearch();
    })

    $('.header-search .search-close').on('click', function(e) {
        e.preventDefault();

        closeHeaderSearch();
    })


	// sliders
	$('.swiper-hero').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {

            slidesPerView: 1,
            
            // Navigation arrows
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },

            // pagination
            pagination: {
                el: jContainer.find('.swiper-pagination'),
                type: 'bullets',
            }
        })
    })

    $('.swiper-hits').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {

            slidesPerView: 2,

            
            // Navigation arrows
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },

            breakpointsInverse: true,
            breakpoints: {
                // when window width is >= 480px
                480: {
                    slidesPerView: 3
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 4
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 6
                },
                // when window width is >= 1400px
                1400: {
                    slidesPerView: 8
                }
            }

        })
    })

    $('.swiper-recommend').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {

            slidesPerView: 2,
            
            // Navigation arrows
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },
            
            breakpointsInverse: true,
            breakpoints: {
                // when window width is >= 480px
                480: {
                    slidesPerView: 3
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 4
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 6
                },
                // when window width is >= 1400px
                1400: {
                    slidesPerView: 8
                }
            }
        })
    })

    $('.swiper-related').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {

            slidesPerView: 2,
            
            // Navigation arrows
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },

            breakpointsInverse: true,
            breakpoints: {
                // when window width is >= 480px
                480: {
                    slidesPerView: 3
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 4
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 6
                },
                // when window width is >= 1400px
                1400: {
                    slidesPerView: 8
                }
            }
        })
    })

    $('.swiper-similar').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {

            slidesPerView: 2,
            
            // Navigation arrows
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },

            breakpointsInverse: true,
            breakpoints: {
                // when window width is >= 480px
                480: {
                    slidesPerView: 3
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 4
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 4
                },
                // when window width is >= 1400px
                1400: {
                    slidesPerView: 5
                }
            }
        })
    })

    $('.product-card .swiper-product-media').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {
            slidesPerView: 1,
            loop: false,
            preloadImages: false,
            lazy: true,
            loadPrevNext: true,
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            },

            pagination: {
                el: jContainer.find('.swiper-pagination'),
                dynamicBullets: true,
                dynamicMainBullets: 5,
                clickable: true
            }
        });
    })

    $('.product-card .swiper-product-colors').each(function (_, container) {
        var jContainer = $(container);
        new Swiper(jContainer, {
            direction: 'vertical',
            slidesPerView: 3,
            loop: false,
            preloadImages: false,
            lazy: true,
            loadPrevNext: true,
            navigation: {
                nextEl: jContainer.find('.swiper-button-next'),
                prevEl: jContainer.find('.swiper-button-prev'),
            }
        });
    })

    $('.section-product .swiper-product-wrapper').each(function (_, container) {
        var sliderContainer, mainSwiper, thumbsSwiper,
            thumbnails, prev, next, pagination,
            thumbsSwiperContainer, mainSwiperContainer;

        sliderContainer = $(container);
        next = sliderContainer.find('.swiper-button-next');
        prev = sliderContainer.find('.swiper-button-prev');
        pagination = sliderContainer.find('.swiper-pagination');


        // Swiper containers
        mainSwiperContainer = sliderContainer.find('.swiper-product-media');
        thumbsSwiperContainer = sliderContainer.find('.swiper-product-thumbnails');


        // Init thumbs swiper
        thumbsSwiper = new Swiper(thumbsSwiperContainer, {
            slidesPerView: 5,
            navigation: {
                nextEl: sliderContainer.find('.swiper-button-next'),
                prevEl: sliderContainer.find('.swiper-button-prev'),
            }
        })

        if (thumbsSwiperContainer.length === 1) {
            thumbnails = thumbsSwiperContainer.find('.swiper-slide');
            thumbnails.click(function (e) {
                var index = thumbnails.index(e.currentTarget);

                mainSwiper.slideTo(index);
                e.preventDefault();
            });
        }


        // Init main swiper
        mainSwiper = new Swiper(mainSwiperContainer, {
            loop: false,
            slidesPerView: 1,

            navigation: {
                nextEl: sliderContainer.find('.swiper-button-next'),
                prevEl: sliderContainer.find('.swiper-button-prev'),
            },

            pagination: {
                el: pagination,
                clickable: true
            },

            on: {
                init: function () {
                    if (thumbnails) {
                        thumbnails.eq(this.realIndex).addClass('active');
                    }
                    mainSwiperContainer.addClass('initialized');
                },
                slideChange: function () {
                    if (thumbnails) {
                        thumbnails.removeClass('active');
                        thumbnails.eq(this.realIndex).addClass('active');
                    }
                    if (thumbsSwiper) {
                        thumbsSwiper.slideTo(this.realIndex);
                    }
                }
            },
            hashnav: true,
            hashnavWatchState: true
        });

    })


    /*  page catalog */

    // open catalog menu on mobile
    $('.menu-toggler').on('click', function(e) {
        e.preventDefault();

        closeCatalogFilter();
        openCatalogMenu();
    })

    // close catalog menu on mobile by click
    $('.menu-close').on('click', function(e) {
        e.preventDefault();
        closeCatalogMenu();
    })

    // open catalog filter on mobile
    $('.filter-toggler').on('click', function(e) {
        e.preventDefault();

        closeCatalogMenu();
        openCatalogFilter();
    })

    // close catalog filter on mobile
    $('.filter-close').on('click', function(e) {
        e.preventDefault();
        closeCatalogFilter();
    })

    // collapse filter item by click
    $('.filter-title').on('click', function(e) {
        e.preventDefault();
        
        var parrentBlock = $(e.currentTarget).closest('.filter-block');
        var parrentContent = parrentBlock.find('.filter-content');



        parrentBlock.toggleClass('in');
        parrentContent.slideToggle();

        // update custom scrollbar
        $(".nano").nanoScroller();
    })

    // show preview modal on click by product card media
    $('.product-card').on('click', '.product-media-wrapper', function(e) {
        if( !($(e.target).hasClass('swiper-pagination-bullet') || $(e.target).hasClass('icon-close')) ) {
            $('#modalPreview').modal('show');
        }
    })

    // init swiper in preview modal
    window.getSwiperInstance = function(block) {
        if (block.length > 0) {
            var swiper = block.get(0).swiper;
            if (typeof swiper != 'undefined' && swiper != null) {
                return swiper;
            }
        }

        return null;
    };

    $('#modalPreview').on('show.bs.modal', function() {
        // init preview slider after start modal
        setTimeout(function() {
            $('.swiper-preview').each(function (_, container) {
                var jContainer = $(container);
                new Swiper(jContainer, {

                    slidesPerView: 1,
                    
                    // Navigation arrows
                    navigation: {
                        nextEl: jContainer.find('.modal-button-next'),
                        prevEl: jContainer.find('.modal-button-prev'),
                    },

                    on: {
                        slideChangeTransitionEnd: function() {
                            var activeSlide = this.slides[this.activeIndex];
                            var activeSlider = $(activeSlide).find('.swiper-product-media');

                            if(activeSlider.length === 1) {
                                var gallerySwiper = getSwiperInstance(activeSlider);
                                if(gallerySwiper !== null) {
                                    gallerySwiper.update();
                                }
                            }
                        }
                    }
                })
            })

            $('.product .swiper-product-wrapper').each(function (_, container) {
                var sliderContainer, mainSwiper, thumbsSwiper,
                    thumbnails, prev, next, pagination,
                    thumbsSwiperContainer, mainSwiperContainer;

                sliderContainer = $(container);
                next = sliderContainer.find('.swiper-button-next');
                prev = sliderContainer.find('.swiper-button-prev');
                pagination = sliderContainer.find('.swiper-pagination');


                // Swiper containers
                mainSwiperContainer = sliderContainer.find('.swiper-product-media');
                thumbsSwiperContainer = sliderContainer.find('.swiper-product-thumbnails');


                // Init thumbs swiper
                thumbsSwiper = new Swiper(thumbsSwiperContainer, {
                    nested: true,
                    slidesPerView: 5,

                    navigation: {
                        nextEl: next,
                        prevEl: prev,
                    },

                    breakpointsInverse: true,
                    breakpoints: {
                        // when window width is >= 992px
                        992: {
                            slidesPerView: 3
                        }
                    },
                    on: {
                        touchStart: function (e) {
                            e.stopPropagation();
                        }
                    }
                })

                if (thumbsSwiperContainer.length === 1) {
                    thumbnails = thumbsSwiperContainer.find('.swiper-slide');
                    thumbnails.click(function (e) {
                        var index = thumbnails.index(e.currentTarget);

                        mainSwiper.slideTo(index);
                        e.preventDefault();
                    });
                }


                // Init main swiper
                mainSwiper = new Swiper(mainSwiperContainer, {
                    loop: false,
                    slidesPerView: 1,

                    navigation: {
                        nextEl: sliderContainer.find('.swiper-button-next'),
                        prevEl: sliderContainer.find('.swiper-button-prev'),
                    },
                    
                    pagination: {
                        el: pagination,
                        clickable: true
                    },

                    on: {
                        init: function () {
                            if (thumbnails) {
                                thumbnails.eq(this.realIndex).addClass('active');
                            }
                            mainSwiperContainer.addClass('initialized');
                        },
                        slideChange: function () {
                            if (thumbnails) {
                                thumbnails.removeClass('active');
                                thumbnails.eq(this.realIndex).addClass('active');
                            }
                            if (thumbsSwiper) {
                                thumbsSwiper.slideTo(this.realIndex);
                            }
                        },
                        touchStart: function (e) {
                            e.stopPropagation();
                        }
                    },
                    hashnav: true,
                    hashnavWatchState: true
                });

            });
            
        }, 300);
    })


    /* page product */
    
    // collapse testimonials
    $('.section-testimonials').on('click', '.testimonials-more', function(e) {
        var button = $(e.currentTarget);
        var container =  $(e.currentTarget).closest('.section-testimonials');
        var grid = container.find('.testimonials-grid');
        var secondaryElements = container.find('.testimonial-item.hidden');

        if (button.data('showTestimonials') === 'full') {
            secondaryElements.slideDown();
        } else {
            secondaryElements.slideUp();
        }
        
        container.find('.testimonials-more').removeClass('hidden');
        button.addClass('hidden');
    })


    /* page cart */ 

    // change selected choose option
    $('.checkout-choose').on('click', function(e) {
        var button = $(e.currentTarget);
        var container =  $(e.currentTarget).closest('.checkout-choose-group');

        
        container.find('.checkout-choose').removeClass('selected');
        button.addClass('selected');
    })


    $('.bg0').on('click', function() {
        closeOffcanvas();
        closeCatalogMenu();
        closeCatalogFilter();
        closeHeaderSearch();
    })



    $(window).on('load', function () {
        windowWidth = window.innerWidth;
        console.log(windowWidth);

        // create layout of catalog page
        layoutCatalog();

        // create layout of product page
        layoutProduct();

        // create layout of modal product preview
        layoutProductPreview();

        // create layout of cart page
        layoutCart()

        if( isPhone() ) {
            createSliderViewed();
        }

        if ( isMobile() ) {
            createSliderProductCollections();
        }

        if ( !isMobile() ) {
            destroySlider('.swiper-viewed');
            destroySlider('.swiper-collections');
        }
    });

    beforeWindowWidthResizeFunctions.push(function () {
        if (desktopToMobileChanged() || mobileToDesktopChanged()) {
            windowWidth = window.innerWidth;

            layoutCatalog();
            layoutProduct();
            layoutProductPreview();
            layoutCart();
        }

        // todo: изменить
        if( isPhone() ) {
            createSliderViewed();
        }

        if ( isMobile() ) {
            createSliderProductCollections();
            collapseFilter();
            uncollapseFirstElementFilter();
        }

        if ( !isMobile() ) {
            destroySlider('.swiper-viewed');
            destroySlider('.swiper-collections');
            uncollapseFilter();
        }
    });
});

$(window).on('scroll', function() {
    var header = $('.header-box'),
        scroll = $(window).scrollTop();

    if (scroll > 128) {
        header.addClass('header-fixed');
    } else {
        header.removeClass('header-fixed');
    }
});


