App = React.createClass ({
    render: function() {
    
    var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
    };
    
    var GIPHY_API_URL = 'YvdtP0Ml4WsuuUAwPhscFTszXHuZ6mKf';
    var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';
    
    return (
        <div style={styles}>
            <h1>GIF SEARCH ENGINE</h1>
            <p>Find your gif at <a href='http://giphy.com'>giphy</a>. Press the 'Enter' button to search for more gif's</p>
            <Search onSearch={this.handleSearch}/>
            <Gif/>
        </div>
        );
    }
    
    handleSearch: function(searchingText) {  
        this.setState({
            loading: true  
        });
        this.getGif(searchingText, function(gif) {  
            this.setState({  
                loading: false,  
                gif: gif,  
                searchingText: searchingText  
            });
        }.bind(this));
    },  
        
    getGif: function(searchingText, callback) {  
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
    var xhr = new XMLHttpRequest();  
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data; 
            var gif = {  
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif);  
        }
    };
    xhr.send();
},    
});
