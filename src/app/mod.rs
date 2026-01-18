use dioxus::prelude::*;

use crate::{pages, shared, widgets};

mod config;

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(widgets::layouts::main_layout)]
        #[route("/", pages::home::Home)]
        Home {},
}

#[component]
pub fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", href: shared::variables::FAVICON }
        document::Link { rel: "stylesheet", href: shared::variables::TAILWIND_CSS }
        Router::<Route> {}
    }
}
