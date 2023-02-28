import React, { useState ,useEffect } from "react";
import LogoutButton from "./LogoutButton";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import isClient from "../../utils/isClient";


export default function DropdownProfile() {

  const [ client, setClient] = useState(true);
  const { user, isLoading, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();



  useEffect( ()=> {
    isClient(user).then((data)=>setClient(data)).catch((error)=>setClient(error));



  },[user])

  
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
          <i className="fa fa-fw fa-user text-dark mr-3"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu id="example-fade-text">
          <Dropdown.ItemText>
            <div className="container bg-ligth border rounded-3 p-2">
              <div className="text-center">
                <img
                  src={user ? user.picture : "..."}
                  width="60px"
                  class="img-fluid rounded-pill mb-2"
                  alt="..."
                />
              </div>
              <small className="text-sm p-0 m-0 f-6 text-nowrap text-uppercase d-block">
                {user ? user.name : "..."}
              </small>
             
              <small className="text-sm p-0 m-0 f-6 text-nowrap text-uppercase d-block mt-2">
              <LogoutButton />
              </small>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Item href="#/action-2">
            <Link to={"/Dashboard"}>Dasboard</Link>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
