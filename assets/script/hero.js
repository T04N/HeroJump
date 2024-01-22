  // Learn cc.Class:
  //  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
  // Learn Attribute:
  //  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
  // Learn life-cycle callbacks:
  //  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

  cc.Class({
    extends: cc.Component,

    properties: {
      jumpSpeed  : cc.v2( {x: 0 , y :300}),
            maxJumpDistance : 300
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
        switch (event.keyCode) {
          case cc.macro.KEY.space:
            this.jumpKeyPressed = true;
            break;
        }
      });
    
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
        switch (event.keyCode) {
          case cc.macro.KEY.space:
            this.isJumping = false;
            this.jumpKeyPressed = false;
            break;
        }
      });
    
      this.node.parent.on(cc.Node.EventType.TOUCH_START, (event) => {
        this.jumpKeyPressed = true;
      });
    
      this.node.parent.on(cc.Node.EventType.TOUCH_END, (event) => {
        this.jumpKeyPressed = false;
        this.isJumping = false;
      });
    },
    

    start() {
      this.body =  this.getComponent(cc.RigidBody);
      this.isJumping = false;
      this.jumpKeyPressed = false;
      this.touchingSurface = false;
      this.startJumpY  = false;
    },

    onBeginContact() {
      cc.log("Begin contact");
      this.touchingSurface = true
    },
    
    onEndContact() {
      cc.log("End contact");
      this.touchingSurface = false
    },

    update(dt) {
      if (this.jumpKeyPressed == true) {
        this.jump();
      }
    },

    jump() {
          // if hero touch the surface
          if(this.touchingSurface == true) { 
              // remmember postion Y 
              this.startJumpY  = this.node.y;
              this.jumpFinished = false; 

              this.isJumping = true;
              this.body.linearVelocity =  this.jumpSpeed
          } else  if (this.isJumping == true  && this.jumpFinished == false)  { 
                    const  jumpDistance = this.node.y - this.startJumpY; 
                  if (jumpDistance <  this.maxJumpDistance ) { 
                  this.body.linearVelocity = this.jumpSpeed
                  } else {
                      this.jumpFinished = true
                  }
          }

    }, 
  });
