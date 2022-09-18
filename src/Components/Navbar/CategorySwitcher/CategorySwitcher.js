import React, { PureComponent } from "react";
import {QueryCategories} from '../../../GraphQL/Query/QueryCategories';
import { Query } from "@apollo/client/react/components";
import "./CategorySwitcher.css";
import { NavLink } from "react-router-dom";

export class CategorySwitch extends PureComponent {
  
  handleClick = () => {};
  render() {

    return (
      <ul className="navigation-container">
      <Query key={"key"} query={QueryCategories}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.categories === undefined) return null;

          return data.categories.map((item, index) => (
            <li>
            <NavLink
            
              to={`${item.name}` == "all" ? "/" : `/${item.name}`}
              key={index} 
              // exact={true}
              // activeClassName="activeLinkStyles"
              // className="linkStyles"
              className={({ isActive }) => ( isActive  ?
                 'activeLinkStyles' : 
                 'linkStyles')}
              >
              {item.name}
            </NavLink>
            </li>
          ));
        }}
      </Query>
      </ul>
    );
  }
}

export default CategorySwitch;