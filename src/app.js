var React = require('react'),
	Parallax = require('react-parallax');

var Application = React.createClass({
	getInitialState: function () {
		return {
			zones: null
		};
	},
	componentDidMount: function () {
		$.ajax({
			url: '/api/rws/directory',
			type: 'GET',
			crossDomain: true,
			json: true,
			success: (response) => {
				this.setState({
					zones: response
				});
			}
		});
	},
	render: function () {
		if (this.state.zones) {
			var zoneContent = {
				padding: '16px'
			};
			var itemContent = {
				display: 'flex',
				flexDirection: 'row'
			};
			var icon = {
				width: '80px',
				height: '80px',
				minWidth: '80px',
				minHeight: '80px',
				'border-radius': '40px',
				'-webkit-border-radius': '40px',
				'-moz-border-radius': '40px',
				margin: '4px 12px 4px 0px'
			};
			var horizontal = {
				display: 'flex',
				flexDirection: 'row'
			};
			var header = {
				whiteSpace: 'nowrap',
				paddingRight: '4px'
			};
			var title = {
				marginBottom: '8px'
			};
			var bannerText = {
				minHeight: '100px',
				color: 'white',
				fontSize: '1.5em',
				verticalAlign: 'bottom',
				paddingLeft: '8px'
			};

			var zoneList = this.state.zones.map(function (zone, index) {
				var contentViews = zone.contents.map(function (content, index) {
					return (
						<div style={itemContent} key={index}>
							<img src={content.iconUrl} alt="" style={icon}/>
							<div>
								<h4 className="title" style={title}>{content.name}</h4>
								{content.showTime&&
									<div style={horizontal}>
										<span style={header}>演出时间:</span>
										<div>{content.showTime}</div>
									</div>
								}
								{content.queueTime&&
									<div style={horizontal}>
										<span style={header}>排队时间:</span>
										<div>{content.queueTime}分钟</div>
									</div>
								}
							</div>
						</div>
					);
				}.bind(this));

				return (
					<div key={index}>
				        <Parallax bgImage={zone.banner} strength={100}>
				            <p style={bannerText}>
				            	{zone.name}
				            </p>
				        </Parallax>
				        <Parallax bgColor="white">
				        	<div style={zoneContent}>
								{contentViews}
							</div>
				        </Parallax>
					</div>
				);
			}.bind(this));

			return (
				<div>
					{zoneList}
				</div>
			);
		} else {
			var spinnerContent = {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%'
			};

			return (
				<div style={spinnerContent}>
					<div className="circles-loader"></div>
				</div>
			);
		}
	}
});

React.render(
	<Application/>,
	document.body
);