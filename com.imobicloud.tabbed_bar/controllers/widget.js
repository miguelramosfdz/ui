var onClick;

/*
 params = {
 	index: 0,
 	labels: [ 'one', 'two', 'three' ],
 	styles: {},
 	onClick: function(index, label){}
 }
 * */
exports.init = function(params) {
	if (params.styles) {
		$.tabbedBar.applyProperties(params.styles);
	}
	
	if (OS_ANDROID) {
		var labels = params.labels,
			index = params.index;
			
		for(var i=0,ii=labels.length; i<ii; i++){
			var classes = 'tabbed-bar-button';
			(i === index) && (classes += ' tabbed-bar-button-active');
		  	$.tabbedBar.add( $.UI.create('Button', { buttonIndex: i, title: '  ' + labels[i] + '  ', classes: classes }) );
		};
	}
	
	$.tabbedBar.labels = params.labels;
	$.tabbedBar.index = params.index;
	
	onClick = params.onClick || function() {};
};

function tabbedBarClicked(e) {
	var button = e.source,
		index = button.buttonIndex,
		lastIndex = $.tabbedBar.index;
		
  	if (index != null && index != lastIndex) {
  		if (onClick(index, $.tabbedBar.labels[index]) === false) {
  			return;
  		}
  		
  		$.addClass(button, 'tabbed-bar-button-active');
		$.removeClass($.tabbedBar.children[ lastIndex ], 'tabbed-bar-button-active');
		$.tabbedBar.index = index;
  	}
}

exports.getIndex = function() {
	return $.tabbedBar.index;
};