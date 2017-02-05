import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom';

// Toy App Stuff
/* eslint-disable react/prop-types */
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todoReducer(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


const todoApp = combineReducers({
  todosReducer,
  visibilityFilter,
});

const Link = ({ active, onClick, children }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <a
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter });
  },
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

// Presentational component
const Todo = ({ onClick, completed, text }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    ),
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch({
      type: 'TOGGLE_TODO',
      id,
    });
  },
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

// class VisibleTodoList extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }
//
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//
//     return (
//       <TodoList
//         todos={getVisibleTodos(state.todos, state.visibilityFilter)}
//         onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
//       />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };
let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;
  nextTodoId += 1;
  return (
    <div>
      <input ref={node => { input = node; }} />
      <button
        onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            id: nextTodoId,
            text: input.value,
          });
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">All</FilterLink>
    {' '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {' '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    {' '}
  </p>
);


const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDom.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('toy')
);
