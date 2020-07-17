const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload };

    case "SET_INVOICES_LIMIT":
      return { ...state, invoicesLimit: action.payload };

    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };

    case "SET_ARTICLES":
      return { ...state, articles: action.payload };

    case "SET_AUTHORS":
      return { ...state, authors: action.payload };

    case "SET_SERVICES":
      return { ...state, services: action.payload };

    case "SET_ARTICLE_AUTHORS":
      return { ...state, articleAuthors: action.payload };

    case "SET_SUBSCRIPTIONS":
      return { ...state, subscriptions: action.payload };

    default:
      return state;
  }
};

export default Reducer;
