
<div class="gradiente">
    <div class="slideBox">
        <ul class="sliderNav">
            <li class="btn prev">❮</li>
            <li class="btn next">❯</li>
        </ul>
        <div class="slider">
            <img src="/img/slide/bg7.jpg">
            <img src="/img/slide/bg8.jpg">
            <img src="/img/slide/bg9.jpg">
        </div>
        <script>
            var slider = tns({
                autoplay: true,
                speed: 500,
                autoplayHoverPause: true,
                autoplayTimeout: 2000,

                // Controles--------------------
                nav: false,
                navPosition: "bottom",
                autoplayButtonOutput: false,
                controlsContainer: ".sliderNav",
            });
        </script>
    </div>
</div>


<style>
    .mobile aside .gradiente {
        display: none;
    }

    .slideBox, .slogan, .cardSlide {
        width: var(--largura1);
    }

    .cardSlide img { width: 3%!important; }

    .mobile .cardSlide img { width: 5%!important; }

    .slideBox {
        position: relative;
        margin: auto;
    }


    .slider img {
        border-radius: var(--radius-3);
        background-size: cover;
        height: 80vh;
    }

    .mobile .slider img {
        border-radius: 0;
    }

    .sliderNav {
        list-style: none;
        position: absolute !important;
        top: 40%;
        z-index: 100;
        width: 100%;
    }

    .sliderNav li{
        position: absolute !important;
        color: #fff;
        background-color: #00000050;
        font-size: calc(1rem + 1vw);
        padding: 5px 4px;
        box-shadow: none;
    }

    .sliderNav li:first-child{ left: 0; }
    .sliderNav li:last-child{ right: 0; }

    .slideBox p {
        margin-top: var(--margin);
        text-align: center;
        font-weight: bold;
        color: #3a3a3a;
    }
    .gradiente{
        background-color: #3a3a3a;
    }

</style>