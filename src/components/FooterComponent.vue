<script setup></script>

<template>
  <footer class="new_footer_area bg_color">
    <div class="new_footer_top">
      <div class="container">
        <div class="row">
          <div class="socials">
            <h3 class="f-title f_600 t_color f_size_18">Socials & Network</h3>
            <div class="f_social_icon">
              <a href="https://github.com/joaovnpt" target="_blank" class="fab fa-github"></a>
              <a href="mailto:joaovitorguiotti8@gmail.com" target="_blank" class="fa-regular fa-envelope"></a>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-5825b0299/" target="_blank" class="fab fa-linkedin"></a>
              <a href="https://www.instagram.com/guiottij/" target="_blank" class="fab fa-instagram"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_bg">
        <div class="footer_bg_one"></div>
        <div class="footer_bg_two"></div>
      </div>
    </div>
    <div class="footer_bottom">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-sm-7">
            <p class="mb-0 f_400">
              © joaovitorguiotti8@gmail.com | 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.new_footer_area {
  background: linear-gradient(#1e1e1e, #0f0f0f);
}
.new_footer_top {
  padding: 120px 0px 270px;
  position: relative;
  overflow-x: hidden;
}
.new_footer_area .footer_bottom {
  padding-top: 5px;
  padding-bottom: 50px;
}
.footer_bottom {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  color: #7f88a6;
  padding: 27px 0px;
}
.socials {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}
.new_footer_top .f_social_icon a {
  width: 44px;
  height: 44px;
  line-height: 43px;
  background: transparent;
  border: 1px solid #e2e2eb;
  font-size: 24px;
  text-decoration: none;
}
.f_social_icon a {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 14px;
  line-height: 45px;
  color: #858da8;
  display: inline-block;
  background: #ebeef5;
  text-align: center;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.ti-facebook:before {
  content: "\e741";
}
.ti-twitter-alt:before {
  content: "\e74b";
}
.ti-vimeo-alt:before {
  content: "\e74a";
}
.ti-pinterest:before {
  content: "\e731";
}

.new_footer_top .f_social_icon a:hover {
  background: #5e2ced;
  border-color: #5e2ced;
  color: white;
}
.new_footer_top .f_social_icon a + a {
  margin-left: 10px;
}
.new_footer_top .f-title {
  margin-bottom: 30px;
  color: #5832be;
}
.f_600 {
  font-weight: 600;
}
.f_size_18 {
  font-size: 18px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #4b505e;
}
.new_footer_top .f_widget.about-widget .f_list li a {
  color: #6a7695;
}

.new_footer_top .footer_bg {
  position: absolute;
  bottom: 0;
  background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png")
    no-repeat scroll center 0;
  width: 100%;
  height: 266px;
}

.new_footer_top .footer_bg .footer_bg_one {
  background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif")
    no-repeat center center;
  width: 330px;
  height: 105px;
  background-size: 100%;
  position: absolute;
  bottom: 0;
  left: 30%;
  -webkit-animation: myfirst 22s linear infinite;
  animation: myfirst 22s linear infinite;
}

.new_footer_top .footer_bg .footer_bg_two {
  background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif")
    no-repeat center center;
  width: 88px;
  height: 100px;
  background-size: 100%;
  bottom: 0;
  left: 38%;
  position: absolute;
  -webkit-animation: myfirst 30s linear infinite;
  animation: myfirst 30s linear infinite;
}

@-moz-keyframes myfirst {
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
}

@-webkit-keyframes myfirst {
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
}

@keyframes myfirst {
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
}
</style>
