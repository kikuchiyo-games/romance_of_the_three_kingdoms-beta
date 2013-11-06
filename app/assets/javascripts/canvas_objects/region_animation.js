var RegionAnimation = function(options){
  this.initialize(options);
};

var p = RegionAnimation.prototype = new createjs.Container();

p.Container_initialize = p.initialize;

p.initialize = function(options){
  var width = 32, height = 32, background = new createjs.Shape();
  _.bindAll(this, 'chosen');
  _.bindAll(this, 'mark_ally');
  _.bindAll(this, 'mark_enemy');
  _.bindAll(this, 'open_attack_menu');
  _.bindAll(this, 'close_attack_menu');
  this.Container_initialize();
  this.discoverer = options.discoverer;
  this.active = options.active;

  if(options.active){
    this.alpha = 0.4;
  } else { this.alpha = 0.0; }

  this.field = options.field
  background.graphics.beginFill(options.color).drawRoundRect(0, 0, width, height, 10);
  this.background = background;
  this.addChild(background);
  if(options.active == true){
    this.addEventListener('click', this.chosen);
    this.cursor = 'pointer';
  }
};

p.chosen = function(event){
  this.discoverer.origin.travel_to(this.pid)
};

p.skirmish = function(){
  this.close_attack_menu();
  this.discoverer.origin.attack(this.pid);
}

p.mark_ally = function(unit){
  this.residing_ally = unit;
};

p.mark_enemy = function(unit){
  this.residing_enemy = unit;
  this.removeChild(this.background);
  this.background = new createjs.Shape();
  this.background.graphics.beginFill('red').drawRoundRect(0, 0, 32, 32, 10)
  this.addChild(this.background);
  if(this.active){
    this.removeEventListener('click', this.chosen);
    this.addEventListener('click', this.open_attack_menu);
  }
};

p.open_attack_menu = function(){
  _.each(this.discoverer.regions, function(region){
    if(region.el.residing_enemy != undefined){
      region.el.removeEventListener('click', region.el.open_attack_menu);

    } else { region.el.removeEventListener('click', region.el.chosen); }

  });

  this.attack_menu = new App.AttackMenu({unit: this.residing_enemy, region_animation: this});
  var enemy = this.residing_enemy,
    general = this.residing_enemy.general;

  $('#attack_menu .battlefield-officer').html( general.surname + ' ' + general.given_name );
  $('#attack_menu .battlefield-officer-war').html( general.war );
  $('#attack_menu .battlefield-officer-loyalty').html( general.loyalty );
  $('#attack_menu .battlefield-officer-intelligence').html( general.intelligence );
  $('#attack_menu .battlefield-officer-leadership').html( general.leadership );
  $('#attack_menu .battlefield-officer-troops').html( Math.round(enemy.troop_count) );
  $('#attack_menu img.media-object').attr('src', 'assets/' + general.avatar);


  this.container = new createjs.Container();
  this.field.addChild(this.container);

  this.content = new createjs.DOMElement("attack_menu");
  this.content.regX = enemy.animation.el.x + 32;
  this.content.regY = enemy.animation.el.y;

  this.container.addChild(this.content);
  this.container.x = enemy.animation.el.x + 30;
  this.container.y = enemy.animation.el.y;
  this.container.alpha = 0.8;
};

p.close_attack_menu = function(){
  _.each(this.discoverer.regions, function(region){
    if(region.el.residing_enemy != undefined){
      region.el.addEventListener('click', region.el.open_attack_menu);

    } else { region.el.addEventListener('click', region.el.chosen); }
  });

  this.content.visible = false;
  this.attack_menu.destroy();
  this.field.removeChild(this.content);
  this.field.removeChild(this.container);
  delete this.content;
  delete this.container;
},
window.RegionAnimation = RegionAnimation;
