use dioxus::prelude::*;

use crate::app;

#[component]
pub fn main_layout() -> Element {
    rsx! {
        Outlet::<app::Route> {}
    }
}
