import React from "react";
import { Anchor } from "component/UIElement/UIElement";
import { useSelector } from "react-redux";
import WebsiteLink from "config/WebsiteLink";
import { Trans } from "lang";

function Menu() {
  const { isAuthenticated, language, quickSectionList,role } = useSelector(
    (state) => state.login
  );

  return (
    <>
      {isAuthenticated && (
        <ul className="nav navbar-menu">
          {role === 'seo' ? '' :
          
          <li className="nav-item">
            <Anchor path={WebsiteLink("/")} className="nav-link">
              {Trans("DASHBOARD", language)}
            </Anchor>
          </li>}

          
          {quickSectionList &&
            JSON.parse(quickSectionList).map((menu, index) => {
              let activeMenu = "";
              const cls = `nav-item ${activeMenu}`;
              return (
                <li className={cls} key={index}>
                  <Anchor
                    path={WebsiteLink(menu.section_url)}
                    className="nav-link"
                  >
                      {Trans(menu.section_name, language)}

                  </Anchor>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default Menu;
