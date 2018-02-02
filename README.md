# Groundcore Search
jQuery plugin to live search a json file

## Dependencies

- Bootstrap 3
- jQuery 2+
 
 
## How to Use

1) Install jQuery2+ and Bootstrap 3. 

2) Add ```groundcoreSearch.min.js``` *after* jQuery and Bootstrap:

```
<script src="/your-js/groundcoreSearch.min.js"></script>
```

3) Make a search:

```
$('#search').groundcoreSearch({
  searchUrl: /repo/data.json
});
```

## Options

- **searchUrl**: source data url (*required*)
- **appendResultTo**: If false, the plugin will create a div next to .form-group parent. You can set an id (or a class...) of a custom DOM element 
- **method**: http method (GET or POST)
- **data**: data to send (*object*)
- **searchConditions**: key on which perform search
- **renderItem**: format results
- **renderNoResults**: format no result
- **minChar**: min number of chars to start search
- **maxChar**: max number of chars to start search
- **limit**: limit result to show
 
### Defaults

```
searchUrl: false,            
appendResultTo: false, 
method: 'GET',
data: {},
minChar: 3,
maxChar: 30,
limit: 25,
searchConditions: function (item, expression) {
    return (item.nome.search(expression) != -1 || item.comune.nome.search(expression) != -1)
},
renderItem: function (item) {
    return '<div>' + item.nome + '</div>';
},
renderNoResults: function(){
    return '<ul class="list-group"><li class="list-group-item">Nessun risultato.</li></ul>';
}
```

## Demo
Examples with basic settings and custom format are in ```demo``` dir.
