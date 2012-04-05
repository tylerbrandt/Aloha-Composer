Aloha.ready(function() {
	var gridSize = 20;

	$(document).ready(function() {
		$("#save").click(function() {
			var state = [];

			$(".aloha-container").each(function() {
				var cont = {
					left: $(this).css("left"),
					top: $(this).css("top"),
					width: $(this).css("width"),
					height: $(this).css("height"),
					content: $(".aloha-content",this).html()
				};
				state.push(cont);
			});

			//console.log(state);
			localStorage["aloha-state"] = JSON.stringify(state);
		});

		$("#restore").click(function() {
			var state, key="aloha-state", cont;
			if(localStorage.hasOwnProperty(key)) {
				// delete existing
				$(".aloha-container").detach();

				state = JSON.parse(localStorage[key]);
				//console.log(state);
				for(cont in state) {
					if(state.hasOwnProperty(cont)) {
						cont = state[cont];
						console.log(cont);
						createEditable(cont);
					}
					
				}
			}
			

		});

		$("#chrome").click(function() {
			if(!$(this).is(':checked')) {
				$(".chrome").css('visibility','hidden');
				$(".aloha-container").addClass("chromeless");
				//$(".aloha-content").removeClass("aloha-editable");
			} else {
				$(".chrome").css('visibility','visible');
				$(".aloha-container").removeClass("chromeless");
				//$(".aloha-content").addClass("aloha-editable");
			}
		})
	});

	function createEditable(cont) {
		var $newEditable = $("<div class='aloha-container ui-widget-content'></div>"),
			$widgetHeader = $("<div class='ui-widget-header chrome'></div>"),
			$closeButton = $("<button class='close-button chrome'>X</button>");

		$closeButton.click(function() {
			$(this).parents(".aloha-container").detach();
		});

		$widgetHeader.append($closeButton);

		$newEditable
			.append($widgetHeader)
			.appendTo('#canvas')
			.css({
				left: cont.left,
				top: cont.top,
				width: cont.width,
				height: cont.height 
			})
			.draggable({
				handle: '.ui-widget-header',
				grid: [gridSize,gridSize]
			})
			.resizable({
				autoHide: true
			})
			.click(function(e) {
				e.stopPropagation();
			})
			;
		
	
		Aloha.jQuery('<div class="aloha-content"></div>')
			.appendTo($newEditable)
			.html(cont.content)
			.aloha();
	}
	
	$("#canvas").click(function(e) {
		createEditable({
			left: Math.floor(e.pageX / gridSize) * gridSize,
			top: Math.floor(e.pageY / gridSize) * gridSize,
			width: '400px',
			height: '200px',
			content: ''
		});

	});
});