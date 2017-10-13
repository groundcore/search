# Groundcore Search
jQuery plugin to live search a json file

## Dependencies

- Bootstrap 3
- jQuery 2+
 
 
## How to Use

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
- **renderNoResults**: forvmat no result
 
### Defaults

```
searchUrl: false,            
appendResultTo: false, 
method: 'GET',
data: {},
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
