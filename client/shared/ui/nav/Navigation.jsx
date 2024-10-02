import React from "react";
import FilterIcon from "@atlaskit/icon/glyph/filter";
import WorkIcon from "@atlaskit/icon/glyph/folder";
import LockIcon from "@atlaskit/icon/glyph/lock";

import {
  ButtonItem,
  NavigationHeader,
  NestableNavigationContent,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import store from "../../model/Store";
import { observer } from "mobx-react-lite";
import AppFrame from "../frame/AppFrame";

const Navigation = observer(() => {
  const { activeTab, setActiveTab, projectKey } = store;

  return (
    <AppFrame shouldHideAppBar>
      <SideNavigation
        label='project'
        testId='side-navigation'
      >
        <NavigationHeader>
          <h3>TeamLead TodoList</h3>
        </NavigationHeader>

        <NestableNavigationContent
          initialStack={[]}
          testId='nestable-navigation-content'
        >
          <Section isList>
            {/* Button for selecting projects */}
            <ButtonItem
              iconBefore={<WorkIcon label='' />}
              isSelected={activeTab === "projects"}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </ButtonItem>

            {/* Button for selecting tasks, conditional on project key */}
            <ButtonItem
              iconBefore={
                projectKey ? (
                  <FilterIcon label='' />
                ) : (
                  <LockIcon label='locked' />
                )
              }
              isSelected={activeTab === "tasks"}
              onClick={() => projectKey && setActiveTab("tasks")}
              isDisabled={!projectKey} // Disable if no project is selected
            >
              Tasks
            </ButtonItem>
          </Section>
        </NestableNavigationContent>
      </SideNavigation>
    </AppFrame>
  );
});

export default Navigation;
