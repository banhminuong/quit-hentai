// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="01_introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="02_the_easy_method.html"><strong aria-hidden="true">2.</strong> The Easy Method</a></li><li class="chapter-item expanded "><a href="03_why_difficult_to_stop.html"><strong aria-hidden="true">3.</strong> Why is it difficult to stop?</a></li><li class="chapter-item expanded "><a href="04_nature.html"><strong aria-hidden="true">4.</strong> Nature</a></li><li class="chapter-item expanded "><a href="05_brainwashing.html"><strong aria-hidden="true">5.</strong> Brainwashing</a></li><li class="chapter-item expanded "><a href="06_brainwashing_aspects.html"><strong aria-hidden="true">6.</strong> Brainwashing Aspects</a></li><li class="chapter-item expanded "><a href="07_just_art_not_real_people.html"><strong aria-hidden="true">7.</strong> It&#39;s Just Art, Not Real People</a></li><li class="chapter-item expanded "><a href="08_illusion_infinite_novelty.html"><strong aria-hidden="true">8.</strong> The Illusion of Infinite Novelty</a></li><li class="chapter-item expanded "><a href="09_anime_makes_it_safer.html"><strong aria-hidden="true">9.</strong> Anime Makes It Safer</a></li><li class="chapter-item expanded "><a href="10_convenience_stigma_paradox.html"><strong aria-hidden="true">10.</strong> The Convenience &amp; Stigma Paradox</a></li><li class="chapter-item expanded "><a href="11_what_am_i_giving_up.html"><strong aria-hidden="true">11.</strong> What am I giving up?</a></li><li class="chapter-item expanded "><a href="12_saving_time.html"><strong aria-hidden="true">12.</strong> Saving Time</a></li><li class="chapter-item expanded "><a href="13_health.html"><strong aria-hidden="true">13.</strong> Health</a></li><li class="chapter-item expanded "><a href="14_the_adv.html"><strong aria-hidden="true">14.</strong> Advantages of Being a Hentai User</a></li><li class="chapter-item expanded "><a href="15_willpower_method.html"><strong aria-hidden="true">15.</strong> The Willpower Method</a></li><li class="chapter-item expanded "><a href="16_beware_cutting_down.html"><strong aria-hidden="true">16.</strong> Beware of Cutting Down</a></li><li class="chapter-item expanded "><a href="17_just_one_peek.html"><strong aria-hidden="true">17.</strong> Just One Peek</a></li><li class="chapter-item expanded "><a href="18_casual_users.html"><strong aria-hidden="true">18.</strong> Casual Users</a></li><li class="chapter-item expanded "><a href="19_youtube_streaming_user.html"><strong aria-hidden="true">19.</strong> The YouTube / Twitch / Streaming Site User</a></li><li class="chapter-item expanded "><a href="20_a_social_habit.html"><strong aria-hidden="true">20.</strong> A social habit?</a></li><li class="chapter-item expanded "><a href="21_timing.html"><strong aria-hidden="true">21.</strong> Timing</a></li><li class="chapter-item expanded "><a href="22_will_i_miss_the_fun.html"><strong aria-hidden="true">22.</strong> Will I miss the fun?</a></li><li class="chapter-item expanded "><a href="23_can_i_compartmentalise.html"><strong aria-hidden="true">23.</strong> Can I Compartmentalise?</a></li><li class="chapter-item expanded "><a href="24_avoid_false_incentives.html"><strong aria-hidden="true">24.</strong> Avoid False Incentives</a></li><li class="chapter-item expanded "><a href="25_the_easy_way_to_stop.html"><strong aria-hidden="true">25.</strong> The Easy Way To Stop</a></li><li class="chapter-item expanded "><a href="26_withdrawal_period.html"><strong aria-hidden="true">26.</strong> The Withdrawal Period</a></li><li class="chapter-item expanded "><a href="27_just_one_little_peek.html"><strong aria-hidden="true">27.</strong> Just One Little Peek</a></li><li class="chapter-item expanded "><a href="28_will_it_be_harder.html"><strong aria-hidden="true">28.</strong> Will it be harder for me?</a></li><li class="chapter-item expanded "><a href="29_substitutes.html"><strong aria-hidden="true">29.</strong> Substitutes</a></li><li class="chapter-item expanded "><a href="30_should_i_avoid_temptation.html"><strong aria-hidden="true">30.</strong> Should I Avoid Temptation Situations</a></li><li class="chapter-item expanded "><a href="31_moment_of_revelation.html"><strong aria-hidden="true">31.</strong> The Moment of Revelation</a></li><li class="chapter-item expanded "><a href="32_the_final_visit.html"><strong aria-hidden="true">32.</strong> The Final Visit</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
