$(document).ready(function(){

    $('.product-slider').slick({
        infinite: false,
        speed: 100,
        vertical: true,
        verticalSwiping: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        useTransform: true,
        accessibility: false,
        arrows: false,        
        responsive: [
            {
              breakpoint: 540,
              settings: {
                vertical: false,
                verticalSwiping: false,   
                dots: true,
                dotsClass: 'product-slider-dots',
              }
            },
        ]

    });


    if(window.innerWidth < 540){
        
        $('.product-slider img').each((i, elem) =>{
            let ext = $(elem).attr('src').lastIndexOf('.jpg');
            let new_src = $(elem).attr('src').slice(0, ext)+'_mobile.jpg';
            $(elem).attr('src', new_src);
        });
        $('.btn-burger').click(function(e){
            $('body').addClass('block-scroll');
            $('.mobile-burger').addClass('active');
            $('.btn-burger').css('display', 'none');           
            $('.nav-row .btn-close-modal').css('display', 'inline-block');            
        });
        $('.btn-close-modal').click(function(){
            $('body').removeClass('block-scroll'); 
            $('.mobile-burger').removeClass('active');
            $('.btn-burger').css('display', 'inline-block');
            $('.nav-row .btn-close-modal').css('display', 'none');                    
        });
        $('.li-collection').click(function(){
            $(this).toggleClass('active');
        });

    }

    $('.may-like-slider').slick({
        infinite: false,
        speed: 100,
        slidesToScroll: 1,
        slidesToShow: 4,
        useTransform: true,
        accessibility: false,                
        appendArrows: $('.may-like-slider-arrows'),
        nextArrow: '<button type="button" class="slick-next"><img src="assets/img/next_active.svg" alt=""></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="assets/img/prev_active.svg" alt=""></button>',
        responsive: [
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
        ]
    }); 

    $('.main-nav li').click(function(e){
        $(this).closest('.main-nav').find('li').removeClass('active');
        $(this).addClass('active');
    });

    $('.link-collection').hover(function(e){
        $(this).addClass('active');        
    },
    function(e){
        $(this).removeClass('active')
    }
    );
    $('.size-subscribe').click(function(e){
        e.preventDefault();        
    });

    $('.add-to-cart').click(function(e){
        if($(this).hasClass('btn-size-error')){
            e.stopImmediatePropagation();
        }else{
            const product_card = $(this).closest('.product-card');
            const product_card_info = 
            {                
                id: product_card.find('.add-to-cart').attr('data-product-id') + product_card.find('.colors-list li.active').attr('id'),
                img: product_card.find('img').first().attr('src'),
                size: product_card.find('.sizes-list li.active').text(),
                color: product_card.find('.color-title').text(),
                title: product_card.find('.product-title').text().toLowerCase(),
                price: product_card.find('.price').text(),
            }
            cart.add_product(product_card_info);            
            cart.display_product();            
        }       
    });
    
    $('.add-to-cart').hover(
        function(e){            
            if(!$('.size-avaliable, .size-few').hasClass('active')){            
                $(this)
                    .addClass('btn-size-error')
                    .text('ВЫБЕРИТЕ РАЗМЕР');                
            }             
        },
        function(e){
            $(this)
                .removeClass('btn-size-error')
                .text('ДОБАВИТЬ В КОРЗИНУ');
        }
    );
    $('.add-to-favorites').click(function(e){
        $(this)
            .find('img')
            .toggleClass('active');
    });

    $('.colors-list li').click(function(e){
        $(this)
            .addClass('active')
            .siblings('li')
            .removeClass('active');
    });

    $('.sizes-list li').click(function(e){
        $(this)
            .addClass('active')
            .siblings('li')
            .removeClass('active');
    });   

    $('.params-list li').click(function(e){
        $(this)
            .toggleClass('active')
            .find('.sub-list-wrap')
            .slideToggle();
    });

/* МОДАЛЬНЫЕ ОКНА */
    $('[data-modal-content]').click(function(e){
        if(window.innerWidth < 540){
            if($(this).attr('data-modal-content') == 'burger') return false;
        }        
        const modal_content = $(this).attr('data-modal-content');
        $('body').addClass('block-scroll');        
        $(`.${modal_content}-wrap`)
                                    .toggleClass('active')
                                    .closest('.modal-module')
                                    .toggleClass('active')
    });

    $('.btn-close-modal, .modal-overlay').click(function(){
        $('body').removeClass('block-scroll'); 
        $(this)
                .closest('.modal-module')
                .toggleClass('active')
                .find('.active')
                .toggleClass('active')
                .find('input')
                .val('');
    });

    $('.btns-auth button').click(function(e){
        $(this)
            .addClass('auth-active')
            .siblings('button').removeClass('auth-active');            
    });
});

// class Cart {
//     constructor(){
//         this.count =   0;
//         this.products = [];
//         this.total_template = '';
//         this.cart_root = $('.cart-wrap');
//     }
    
//     add_product(product_info){        
//         this.products.push(Object.assign({}, product_info));
//         this.display_product();                       
//     }
//     delete_product(id){
//         this.products = this.products.filter(product => product.id !== id);        
//         this.display_product();
//     }
       
//     add_event_delete(){
//         const that = this;
//         $('.cart-products-wrap').click(function(e){            
//             if($(e.target).hasClass('cart-delete-product')){
//                 const product_id = $(e.target).closest('.cart-product-row').attr('id');
//                 that.delete_product(product_id); 
//             }
//         });
//     }

//     display_product() { 
//         const that = this;
//         this.products.forEach(function(product){                       
//             that.total_template += that.render_product(product);
//         });
//         this.count = this.products.length;
//         this.cart_root.html(this.render_module(this.total_template));
//         this.add_event_delete();
//         this.total_template = '';
        
        
//     }

//     render_module(template_product){
//         return `<div class="modal-content">
//                         <div class="modal-title">КОРЗИНА (${this.count})</div>
//                         <div class="cart-products-wrap container-fluid">
//                             ${template_product}
//                         </div>
//                         <div class="btns-cart-choice">
//                             <button class="btn-continue text-black">ПРОДОЛЖИТЬ ПОКУПКИ</button>
//                             <button class="btn-order text-white">ОФОРМИТЬ ЗАКАЗ</button>
//                         </div>
//                 </div>`;
//     }
//     render_product(product){
//         return `<div id="${product.id}" class="row cart-product-row">
//                             <div class="col cart-product-img">
//                                 <img src="${product.img}" alt="">
//                             </div>
//                             <div class="col-6 cart-product-info">
//                                 <div class="cart-product-title">${product.title}</div>
//                                 <div class="cart-product-color">${product.color}</div>
//                                 <div class="cart-product-size">Размер: ${product.size}</div>
//                             </div>
//                             <div class="col cart-product-price">
//                                 <div class="cart-product-price">${product.price}</div>
//                                 <button class="cart-delete-product text-light">удалить</button>
//                             </div>
//                 </div>`;
//     } 

//     send_order(){

//     }
    
// };

// const cart = new Cart();






