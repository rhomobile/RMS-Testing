var _alert = window.alert, _confirm = window.confirm;
var _ = {};
(function() {
    var resolution = window.innerWidth + 'x' + window.innerHeight;
    var result = false, callback = null;
    var style = {
        '480x602': {
            container: 'position: absolute;top: 0;bottom: 0;width: 100%;z-index: 9999;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; font-family: Tahoma; background: rgba(0, 0, 0, 0.5);',
            boxWrapper: '',
            box: 'display: -webkit-box;-webkit-box-orient: vertical;width: 354px;height: 354px;padding: 10px 9px 20px;-webkit-box-sizing: border-box;border-radius: 7px;-webkit-box-shadow: 0 3px 18px 4px rgba(0, 0, 0, 0.75);background: #ffffff;',
            messageContainer: 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-orient: vertical',
            topLabel: 'display: -webkit-box;-webkit-box-pack: center;padding: 10px;background: #eeeeee;font-size: 28px;font-weight: bold; margin: 7px 0;border-radius: 3px;',
            messageWrapper: 'display: -webkit-box;-webkit-box-flex: 1;font-size: 24px;font-weight: bold;-webkit-box-align: center;-webkit-box-pack: center;overflow: hidden',
            message: 'display: block; color: #777777;text-align: center;',
            bottom: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center',
            buttonContainer: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: start; width: 50%;',
            button: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-flex: 1;height: 57px;border-radius: 5px;background-image: -webkit-linear-gradient(bottom, #246501 0%, #379901 100%);',
            span: 'display: block;height: 30px;font-size: 22px;font-weight: bold;color: #ffffff;-webkit-box-flex: 1;text-align: center;overflow: hidden;text-overflow: ellipsis;',
            buttonFalse: '-webkit-linear-gradient(bottom, #505358 0%, #9FA5AD 100%)',
            spanFalse: ''
        },
        '320x240': {
            container: 'position: absolute;top: 0;bottom: 0;width: 100%;z-index: 9999;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; font-family: Tahoma; background: rgba(0, 0, 0, 0.5);',
            boxWrapper: 'width: 306px;height: 226px;padding: 0 8px 8px 7px;-webkit-box-sizing: border-box;border-top: 2px solid white;border-left: 2px solid white;border-right: 2px solid black;border-bottom: 2px solid black;border-radius: 5px;background: #6D6F72;',
            box: 'display: -webkit-box;width: 100%;height: 100%;-webkit-box-orient: vertical;text-align: center',
            messageContainer: 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-orient: vertical',
            topLabel: 'display: -webkit-box;-webkit-box-pack: center;padding: 10px;background: #eeeeee;font-size: 18px;font-weight: bold; margin: 7px 0;border-radius: 3px;',
            messageWrapper: 'display: -webkit-box;-webkit-box-flex: 1;font-size: 14px;font-weight: bold;-webkit-box-align: center;-webkit-box-pack: center;overflow: hidden',
            message: 'display: block; color: #fff;',
            bottom: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center',
            buttonContainer: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; width: 50%;',
            button: 'border: 3px solid black;border-radius: 6px;display: -webkit-box;padding: 2px;-webkit-box-flex: 1;height: 50px;-webkit-box-sizing: border-box;background: white;',
            span: 'border: 1px solid #000;border-radius: 3px;display: block;line-height: 38px;padding: 0 5px;font-size: 18px;font-weight: bold;-webkit-box-flex: 1;text-align: center;overflow: hidden;text-overflow: ellipsis;',
            buttonFalse: '#ffffff',
            spanFalse: '0 none'
        }
    }    
    
    //Create the DOM elements
    var container = document.createElement('div');

    container.style.cssText = style[resolution].container;
    
    var boxWrapper = document.createElement('div');
    boxWrapper.style.cssText = style[resolution].boxWrapper;
    
    var box = document.createElement('div');
    box.style.cssText = style[resolution].box;
    
    var messageContainer = document.createElement('div');
    messageContainer.style.cssText = style[resolution].messageContainer;
    
    var topLabel = document.createElement('span');
    topLabel.innerText = 'Alert';
    topLabel.style.cssText = style[resolution].topLabel;
    
    var messageWrapper = document.createElement('div');
    messageWrapper.style.cssText = style[resolution].messageWrapper;
    
    var message = document.createElement('span');
    message.style.cssText = style[resolution].message;
    
    messageWrapper.appendChild(message);
    messageContainer.appendChild(topLabel);
    messageContainer.appendChild(messageWrapper);

    var bottom = document.createElement('div');
    bottom.style.cssText = style[resolution].bottom;

    var buttonTrueContainer = document.createElement('div');
    buttonTrueContainer.style.cssText = style[resolution].buttonContainer;
    
    var buttonTrue = document.createElement('a');
    buttonTrue.className = 'btn';

    buttonTrue.addEventListener('click', function() {
       result = true; 
       hideWindow(); 
    });
    buttonTrue.style.cssText = style[resolution].button;

    var spanTrue = document.createElement('span');
    spanTrue.innerText = 'OK';
    spanTrue.style.cssText = style[resolution].span;

    buttonTrue.appendChild(spanTrue);
    buttonTrueContainer.appendChild(buttonTrue);

    var buttonFalseContainer = document.createElement('div');
    buttonFalseContainer.style.cssText = style[resolution].buttonContainer;
    
    var buttonFalse = document.createElement('a');
    buttonFalse.className = 'btn';
    buttonFalse.addEventListener('click', function() {
       result = false;
       hideWindow(); 
    });
    buttonFalse.style.cssText = style[resolution].button;
    buttonFalse.style['background'] = style[resolution].buttonFalse;

    var spanFalse = document.createElement('span');
    spanFalse.innerText = 'NO';
    spanFalse.style.cssText = style[resolution].span;
    spanFalse.style.border = style[resolution].spanFalse;

    buttonFalse.appendChild(spanFalse);
    buttonFalseContainer.appendChild(buttonFalse);
    
    bottom.appendChild(buttonTrueContainer);
    bottom.appendChild(buttonFalseContainer);
    
    box.appendChild(messageContainer);
    box.appendChild(bottom);
    boxWrapper.appendChild(box);
    container.appendChild(boxWrapper);
    
    //Private methods
    var showWindow = function(string) {
        message.innerHTML = string;
        
        document.body.appendChild(container);
    };

    var hideWindow = function() {
        document.body.removeChild(container);

        callback(result);
    };
    
    window.alert = _.alert = function(string, clb) {
        callback = clb || function(){};
        buttonFalseContainer.style.display = 'none';
        buttonTrueContainer.style.removeProperty('-webkit-box-flex');
        topLabel.innerText = 'Alert';
        showWindow(string);
    }
    
    window.confirm = _.confirm = function(string, clb) {
        callback = clb || function(){};
        buttonFalseContainer.style.display = '-webkit-box';
        buttonFalseContainer.style['-webkit-box-flex'] = '1';
        buttonFalseContainer.style['margin-left'] = '10px';
        buttonTrueContainer.style['-webkit-box-flex'] = '1';
        topLabel.innerText = 'Confirm';
        showWindow(string);
    }
    
})();

/*var confirm = _.confirm = (function() {
    var result = false, callback = null;
    
    //Create the DOM elements
    var container = document.createElement('div');
    container.style.cssText = 'position: absolute;top: 0;width: 320px;height: 240px;z-index: 9999;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; background: rgba(0, 0, 0, 0.5);';

    var boxWrapper = document.createElement('div');
    boxWrapper.style.cssText = "width: 306px;height: 226px;padding: 0 8px 8px 7px;-webkit-box-sizing: border-box;border-top: 2px solid white;border-left: 2px solid white;border-right: 2px solid black;border-bottom: 2px solid black;border-radius: 5px;background: #6D6F72;";

    var box = document.createElement('div');
    box.style.cssText = 'display: -webkit-box;width: 100%;height: 100%;-webkit-box-orient: vertical;text-align: center';

    var messageContainer = document.createElement('div');
    messageContainer.style.cssText = 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-orient: vertical';

    var topLabel = document.createElement('span');
    topLabel.innerText = config.confirm.title;
    topLabel.style.cssText = 'display: -webkit-box;-webkit-box-pack: center;padding: 10px;background: #eeeeee;font-size: 18px;font-weight: bold; margin: 7px 0;border-radius: 3px;';

    var messageWrapper = document.createElement('div');
    messageWrapper.style.cssText = 'display: -webkit-box;-webkit-box-flex: 1;font-size: 14px;font-weight: bold;-webkit-box-align: center;-webkit-box-pack: center;overflow: hidden';

    var message = document.createElement('span');
    message.style.cssText = 'display: block; color: #fff;';
    
    messageWrapper.appendChild(message);
    messageContainer.appendChild(topLabel);
    messageContainer.appendChild(messageWrapper);
    
    var buttonWrapper = document.createElement('div');
    buttonWrapper.style.cssText = 'display: -webkit-box;-webkit-box-align: center;-webkit-box-orient: horizontal';
    
    var buttonTrueContainer = document.createElement('div');
    buttonTrueContainer.style.cssText = 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-align: center;-webkit-box-pack: start;width: 50%';
    
    var buttonTrue = document.createElement('a');

    buttonTrue.addEventListener('click', function() {
       result = true; 
       hideWindow(); 
    });
    buttonTrue.style.cssText = 'border: 3px solid black;border-radius: 6px; border-top-right-radius: 0;border-bottom-right-radius: 0;display: -webkit-box;padding: 2px;-webkit-box-flex: 1;height: 50px;-webkit-box-sizing: border-box;background: white; margin-rught: 5px;';

    var spanTrue = document.createElement('span');
    spanTrue.innerText = config.alert.button;
    spanTrue.style.cssText = 'border: 1px solid #000;border-radius: 3px;display: block;line-height: 38px;padding: 0 5px;font-size: 18px;font-weight: bold;-webkit-box-flex: 1;text-align: center;overflow: hidden;text-overflow: ellipsis;';

    spanTrue.innerText = config.confirm.buttonTrue;

    buttonTrue.appendChild(spanTrue);
    buttonTrueContainer.appendChild(buttonTrue);

    var buttonFalseContainer = document.createElement('div');
    buttonFalseContainer.style.cssText = 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-align: center;-webkit-box-pack: end; width: 50%';
    
    var buttonFalse = document.createElement('a');
    buttonFalse.addEventListener('click', function() {
       result = false;
       hideWindow(); 
    });
    buttonFalse.style.cssText = 'border: 3px solid black;border-radius: 6px; border-top-left-radius: 0;border-bottom-left-radius: 0; display: -webkit-box;padding: 2px;-webkit-box-flex: 1;height: 50px;-webkit-box-sizing: border-box;background: white; margin-left: 5px;';

    var spanFalse = document.createElement('span');
    spanFalse.innerText = config.confirm.buttonFalse;
    spanFalse.style.cssText = 'border: 1px solid #fff;border-radius: 3px;display: block;line-height: 38px;padding: 0 5px;font-size: 18px;font-weight: bold;-webkit-box-flex: 1;text-align: center;overflow: hidden;text-overflow: ellipsis;';

    buttonFalse.appendChild(spanFalse);
    buttonFalseContainer.appendChild(buttonFalse);

    buttonWrapper.appendChild(buttonTrueContainer);
    buttonWrapper.appendChild(buttonFalseContainer);
    
    box.appendChild(messageContainer);
    box.appendChild(buttonWrapper);
    boxWrapper.appendChild(box);
    container.appendChild(boxWrapper);
    
    //Private methods
    var showWindow = function(string) {
        message.innerHTML = string;
        
        document.body.appendChild(container);
    };
    
    var hideWindow = function() {
        document.body.removeChild(container);
        
        callback(result);
    };
    
    return function(string, clb) {
        callback = clb || function(){};
        showWindow(string);
    }
})();*/
