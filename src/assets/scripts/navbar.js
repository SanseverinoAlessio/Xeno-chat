function navbarStart (){


  function Navbar(navbarSelector){
  this.navbarSelector = navbarSelector;
  this.nav_link = $(this.navbarSelector + ' .nav-link');
  this.sidebar = new Sidebar();

  this.activeNavbar = ()=>{
  let scrolltop = $(window).scrollTop();
  if(scrolltop > 150){
  $(this.navbarSelector).addClass('active');
  }
  else{
  $(this.navbarSelector).removeClass('active');
  }
  }
  }

 function Sidebar(){
  var sidebarselector = '';
  this.menubtn = '';
  var menubtnline = this.menubtn + ' .line';
  this.removesidebar = '';

  this.ToggleSlidebar = ()=>{
  $(sidebarselector).css('transition', '0.7s');
  $(sidebarselector).toggleClass('active');
  $(this.removesidebar).css('transition', '0.7s');
  $(this.removesidebar).toggleClass('active');


  }
  this.setsidebar = (selector)=>{
  sidebarselector = selector + ' .sidebar';
  this.menubtn = selector + ' .hamburgermenu';
  this.removesidebar = selector + ' .removesidebar';
  }

  this.removetransition = ()=>{
  $(sidebarselector).css('transition', '');
  $(this.removesidebar).css('transition', '');

  }
  this.closeSidebar = ()=>{
  $(sidebarselector).removeClass('active');
  $(this.removesidebar).removeClass('active');


  }

  this.toggleline = ()=>{
  $(menubtnline).each((index)=>{
  if(index < 2){
  $(menubtnline).eq(index).toggleClass('anim');
  }
  else{
  $(menubtnline).eq(index).toggleClass('hide');
  }
  });
  }
  this.removeanimonline = ()=>{
  $(menubtnline).each((index)=>{
  if(index < 2){
  $(menubtnline).eq(index).removeClass('anim');
  }
  else{
  $(menubtnline).eq(index).removeClass('hide');
  }
  });
  }
  }

console.log('funge');
var Navbarobj = new Navbar('#navbar');
var ToProjectBtn = $('#toProject');
Navbarobj.sidebar.setsidebar(Navbarobj.navbarSelector);


$(window).on('scroll',()=>{
Navbarobj.activeNavbar();
});

$(Navbarobj.sidebar.menubtn).on('click',()=>{
Navbarobj.sidebar.ToggleSlidebar();
Navbarobj.sidebar.toggleline();
});

$(window).on('resize',()=>{
let width = $(window).width();
if(width > 768){
Navbarobj.sidebar.removetransition();
Navbarobj.sidebar.closeSidebar();
Navbarobj.sidebar.removeanimonline();
}
});
ToProjectBtn.on('click', (e)=>{
e.preventDefault();
Navbarobj.selectDiv(e.target);
});
$(Navbarobj.sidebar.removesidebar).on('click',()=>{
Navbarobj.sidebar.closeSidebar();
Navbarobj.sidebar.removeanimonline();
});
//On start
Navbarobj.activeNavbar();
}
