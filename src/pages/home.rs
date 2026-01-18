use crate::shared::ui::{button, tabs};
use dioxus::prelude::*;

/// The Home page component that will be rendered when the current route is `[Route::Home]`
#[component]
pub fn Home() -> Element {
    rsx! {
        h1 { "Hello World!" }
        button::Button {
            onclick: move |_| {
                info!("Hello World!");
            },
            variant: button::ButtonVariant::Secondary,
            "Click"
        }
        tabs::Tabs {
            default_value: "tab1".to_string(),
            horizontal: true,
            tabs::TabList {
                tabs::TabTrigger { value: "tab1".to_string(), index: 0usize, "Tab 1" }
                tabs::TabTrigger { value: "tab2".to_string(), index: 1usize, "Tab 2" }
                tabs::TabTrigger { value: "tab3".to_string(), index: 2usize, "Tab 3" }
            }
            tabs::TabContent { index: 0usize, value: "tab1".to_string(),
                div {
                    "Tab 1 Content"
                }
            }
            tabs::TabContent {
                index: 1usize,
                class: "tabs-content",
                value: "tab2".to_string(),
                div {
                    "Tab 2 Content"
                }
            }
            tabs::TabContent { index: 2usize, value: "tab3".to_string(),
                div {
                    "Tab 3 Content"
                }
            }
        }
    }
}
