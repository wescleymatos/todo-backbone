var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        done: false
    },
    toggle: function() {
        console.log(!this.get('done'));
        //this.done =  !this.get('done')
        this.save({done: !this.get('done')});
    }
});

var TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone')
});

var TodoItem = Backbone.View.extend({
    //el: '#todo-list',
    tagName:  'li',
    template: _.template($('#item-template').html()),
    events: {
        'click .toggle'   : 'toggleDone',
    },
    initialize: function() {
        this.ul = $('#todo-list');
        this.listenTo(this.model, 'change', this.render);
        //this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        console.log(this.model.toJSON());
        this.ul.append(this.$el.append(this.template(this.model.toJSON())));
        //this.$el.toggleClass('done', this.model.get('done'));
        // this.input = this.$('.edit');
        // return this;
    },
    toggleDone: function(e) {
        //console.log(this.model);
        this.model.toggle();
    }
});

var AppView = Backbone.View.extend({
    el: '#app',
    //template: _.template($('#item-template').html()),
    events: {
        'keypress #new-todo': 'createOnEnter'
    },
    initialize: function() {
        this.todos = new TodoList();

        this.listenTo(this.todos, 'add', this.addOne)
    },
    render: function() {
        //console.log(this.todos);
        //this.$el.html(this.template(this.todos.models[0].toJSON()));
    },
    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        if (!e.target.value) return;

        this.todos.add({id: 1,title: e.target.value});
    },
    addOne: function (todo) {
        var item = new TodoItem({model: todo});
        item.render();
    }
});

var view = new AppView();
view.render();
