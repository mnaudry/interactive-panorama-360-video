const containerWidth = document.querySelector(".container-video");
const videoHeight = Math.round(containerWidth.getBoundingClientRect().width / 2);

let playerElement = document.querySelector("#player");

const btnStart =  document.querySelector(".btn-start-pres");

const btnTabCloses = document.querySelectorAll('.btn-close-tab:not(.close-fiche)');

const btnTabCloseFiches = document.querySelectorAll('.btn-close-tab.close-fiche');

const btnTabs = document.querySelectorAll('.btn-tab');

const btnTabsFiche = document.querySelectorAll('.btn-fiche-tab');

const btnInfos = document.querySelectorAll('.btn-info');

const TabSeekTimes = [{id:'#pratique',time:1}, {id:'#vest',time:28} ,{id:'#match',time:57},{id:'#outdoor',time:99},{id:'#disco',time:120}];

const dataPlayerInfos = [
    { id : 1 , number: 43 , name: "Carole Mallet", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 2 , number: 18 , name: "Francoise Bernard", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 3 , number: 50 , name: "Leticia Mallet", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 4 , number: 74 , name: "Pascale Mallet", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 5 , number: 60 , name: "Bintu Marie", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 6 , number: 30 , name: "yelele Mallet", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
    { id : 7 , number: 43 , name: "Marie juro", position : "Jammer", ligue : "Lumbersmacks", forces : "solide et rapide" , occupation : "Poste Canada", experience : 12 },
]


const showRollerContainer = (roller) => {

    let $tabs = roller.querySelectorAll('.tab-pane');

    $tabs.forEach((tab)=> {
        if(tab.classList.contains('active')) {
            tab.classList.add('show');
        }
    })
    roller.style.width = '50%';
}

const isRollerShowed = () => {
    const  roller = document.querySelector("#roller-overlay");
    const rect = roller.getBoundingClientRect();
    return  (rect.width > 0) ;
}

const hideRollerContainer = (roller) => {

    let $tabs = roller.querySelectorAll('.tab-pane');

    $tabs.forEach((tab)=> {
            if(tab.classList.contains('tab-fiche')){
                tab.classList.remove('active');
            }
            tab.classList.remove('show');
    })

    roller.style.width = '0px';
}


const hideFicheContainerAndChilds =() => {
    const fiche = document.querySelector(".fiche-container");

    fiche.style.display= "none";

    const ficheTabs = fiche.querySelectorAll(".tab-pane");

    ficheTabs.forEach((tab)=> {
            tab.classList.remove('show');
            tab.classList.remove('active');
    })

}

const showFicheContainer = () => {
    const fiche = document.querySelector(".fiche-container");
    fiche.style.display= "block";
}

const showPresContainer = () => {
    document.querySelector(".pres-container").style.display = "block";
}

const hidePresContainer = () => {
    document.querySelector(".pres-container").style.display = "none";
}


const toggleRollerContainer = () => {
    /*const  roller = document.querySelector("#roller-overlay");
    const rect = roller.getBoundingClientRect();

    if(rect.width > 0) {
        hideRollerContainer(roller);
    }else {
        showRollerContainer(roller);
    }*/

    const  roller = document.querySelector("#roller-overlay");

    if(isRollerShowed()) {
        //fiche-container have to be hidden and pres-container visible
        hideRollerContainer(roller);
        hideFicheContainerAndChilds();
        showPresContainer();
    }else {
        showPresContainer();
        showRollerContainer(roller);
    }

}



btnStart.addEventListener('click', () => {
    toggleRollerContainer();
})

btnTabCloses.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        //const currentTab =  event.target.closest(".tab-pane");
        const roller = document.querySelector("#roller-overlay");
        hideRollerContainer(roller);
    })
});

btnTabCloseFiches.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        hideFicheContainerAndChilds();
        showPresContainer();
    })
});

btnInfos.forEach((btn) => {
    btn.addEventListener('click', (event) => {

        event.preventDefault();
        //tabTrigger.show();
        const tabs = document.querySelectorAll(".tab-fiche");
        //hideActiveTab(tabs);

        tabs.forEach((tab) => {
            tab.classList.remove("active");
            tab.classList.remove("show");
        })

       const tabToActivate = document.querySelector("#fiche-info");

       //fill data

       /*<div class="player-inf-top"><span class="player-number"></span><span class="player-name"></span></div>
                        <div class="player-inf-bottom">
                            <span class="player-position"></span>
                            <span class="player-ligue"></span>
                            <span class="player-ligue"></span>
                            <span class="player-forces"></span>
                            <span class="player-occupation"></span>
                            <span class="player-experience"></span>
                        </div>*/

      const id  = btn.getAttribute('data-player-info');

      const data = dataPlayerInfos.find( dataPlayerInfo => dataPlayerInfo.id == id , id);

      tabToActivate.querySelector(".player-number").textContent = `#${data.number}`;
      tabToActivate.querySelector(".player-name").textContent = data.name ;
      tabToActivate.querySelector(".player-position").textContent = data.position;
      tabToActivate.querySelector(".player-ligue").textContent = data.ligue;
      tabToActivate.querySelector(".player-forces").textContent = data.forces;
      tabToActivate.querySelector(".player-occupation").textContent = data.occupation;
      tabToActivate.querySelector(".player-experience").textContent = data.experience;

        tabToActivate.classList.add('active');
        tabToActivate.classList.add('show');

       // showAndActiveTab(tabId);
        
    })
});

const hideActiveTab = (tabs) => {

   

    let activeTab = getActiveTab(tabs)

    if(activeTab === null) {
        console.error("active tab not found");
        return ;
    }
    activeTab.classList.remove("active");
    activeTab.classList.remove("show");

};

const getActiveTab = (tabs) => {
    let activeTab =  null;

    for(const tab of tabs.values()) {
        if( tab.classList.contains('active')) {
            activeTab = tab ;
            
            break;
        }
    }

    return activeTab;
}

const showAndActiveTab = (tabId ,show = true) => {

  const tab = document.querySelector(tabId);

  if(tab) {
    tab.classList.add('active');
    if(show)
        tab.classList.add('show');
  }

}




btnTabs.forEach((btn)=>{

    //let tabTrigger = new bootstrap.Tab(btn);

    btn.addEventListener('click', function (event) {
        event.preventDefault();
        //tabTrigger.show();
        const tabs = document.querySelectorAll(".tab-pane");
        hideActiveTab(tabs);

        const tabId = btn.getAttribute('data-bs-target');

        showAndActiveTab(tabId);

        //console.log(tabId);

        if(player){
          // const seekTime = TabSeekTimes.find(seektime => seektime.id == tabId, tabId);
          const seekTime = TabSeekTimes.find(seektime => seektime.id == tabId ,tabId);
        
          if(typeof seekTime === undefined) {
            player.seek(0);
            return;
          }

          player.seek(seekTime.time);

        }
       
    })

});


btnTabsFiche.forEach((btn)=> {

    btn.addEventListener('click', function (event) {
        event.preventDefault();
        hidePresContainer();
        const fiche = document.querySelector("#fiche");
        fiche.classList.add('active');
        fiche.classList.add('show');
        showFicheContainer();

    });
});

window.addEventListener('resize',() => {
    let height =   Math.round(containerWidth.getBoundingClientRect().width / 2);
   
   if(isMobile()){
     //console.log(window.innerHeight,height);
     if(window.innerHeight < height) {
        //console.log( window.innerHeight);
        height = window.innerHeight - 30 ;
     }
   }

   player.resize({height: height, width: '100%'});


});

const isMobile = () => {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

const player = new Clappr.Player(
    {
        source: "derby360.mp4",
        height:videoHeight,
        width: '100%',
        plugins: {
            container: [Video360],
        },
        events : {

            onReady: function() {
               // console.log(this);
            }
            ,

            onTimeUpdate: function(progress) {
                //TabSeekTimes
                currentTime = Number.parseInt(progress.current);

                const tabs = document.querySelectorAll('.pres-container .tab-pane');
                const rollerShowed = isRollerShowed();
                activeTab = getActiveTab(tabs);
                //
                //[{id:'#pratique',time:1}, {id:'#vest',time:28} ,{id:'#match',time:57},{id:'#outdoor',time:99},{id:'#disco',time:120}];

                const activateCurrentTab = (id) => {
                    const currentId = activeTab.getAttribute("id") ;
                    if(`#${currentId}` != id) {
                       // console.log(activeTab.getAttribute("id"),id);
                        hideActiveTab(tabs);
                        if(rollerShowed)
                            showAndActiveTab(id);
                        else
                            showAndActiveTab(id,false);
                    }
                };


                if(currentTime > 0  &&  currentTime <28) {
                    activateCurrentTab("#pratique");
                } else if(currentTime >27   &&  currentTime <57) {
                    activateCurrentTab("#vest");
                }else if(currentTime >56   &&  currentTime <99) {
                    activateCurrentTab("#match");
                }else if(currentTime >98   &&  currentTime <120) {
                    activateCurrentTab("#outdoor");
                }else if(currentTime > 119) {
                    activateCurrentTab("#disco");
                }else {
                    activateCurrentTab("#pratique");
                }
            },

        },


    });

player.listenTo(player, Clappr.Events.PLAYER_READY, () => {

    //add style sheet
    const style = document.createElement('link');
    style.setAttribute("href","css/roller.css");
    style.setAttribute("rel","stylesheet");

    document.querySelector("head").append(style);

    const container = player.core.activeContainer.$el ;
    const  roller = document.querySelector("#roller-overlay");
    roller.remove();
    roller.style.display ='block';
    roller.style.width = '0px';
    //roller.style.transform ="translateX(100%)";
    container.append(roller);

    if(isMobile()){
        player.core.toggleFullscreen  = () => {
            //
        } 
    }

    //media player

});


player.attachTo(playerElement);

player.core.activeContainer.on(Clappr.Events.CONTAINER_MEDIACONTROL_SHOW , function() { 

    if(isMobile()){
        const mediaPlayer = document.querySelector("button.media-control-button[data-fullscreen]");
        mediaPlayer.style.display = "none";
    }
   
});



player.getPlugin('click_to_pause').disable();

