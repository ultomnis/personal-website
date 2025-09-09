---
title: Integrity and VC Funding in Open-Source Projects
description: Insights and interpretations concerning venture capitalist funding in open-source projects.
date: 2025-09-02T18:13:00
tags:
  - ethics
  - open-source
  - tech
---

Venture capital (VC) funding has become nearly ubiquitous with the tech sector. Aided by the AI
boom, VC funding continues to have far-reaching impacts in all areas of tech, including in the
open-source space. Prominent companies that make their products open source and have taken on
VC funding include [Tailscale](https://tailscale.com/blog/series-c),
[Zed](https://zed.dev/blog/sequoia-backs-zed), and
[Bitwarden](https://bitwarden.com/blog/accelerating-value-for-bitwarden-users-bitwarden-raises-usd100-million/).

A growing number of companies building open-source software are gravitating toward VC funding, and not all make it
out without consequences. Of course, VC funding doesn't always spell doom and gloom, and not all
VC firms are created with bad intentions (see [Mozilla Ventures](https://mozilla.vc/)).
Nevertheless, it should be stated that with VC firms involved, profitability becomes a driving
factor in decisions; often, this occurs at the expense of the user.

## VC Funding for the Uninitiated

Materializing or expanding any software product is extremely difficult to do without funding or
community support. Bank loans are an unattractive option due to the need to repay debt, and banks
may not be willing to take on the risk. Another option is VC funding, which is primarily driven
through private equity.

VC funding is generally broken into [seed funding](https://en.wikipedia.org/wiki/Seed_money) and
[rounds](https://en.wikipedia.org/wiki/Venture_round#Round_names). Seed funding refers to the
initial capital invested to launch a product off the ground and is not exclusive to VC funding.
Further rounds of funding can be used to rapidly expand a product and are referred to as Series
A, B, C, and so on. By investing in the product, VC firms receive equity, or shares of the
project. Using VC funding, the project does not need to repay debt. However, VC firms do expect a
return on their investment and develop a stream of exit strategies to maximize their profits and
minimize any losses.

The two most common exit strategies are
[initial public offerings](https://en.wikipedia.org/wiki/Initial_public_offering) (IPOs) and
[acquisitions](https://en.wikipedia.org/wiki/Mergers_and_acquisitions). With an IPO, the company
goes public, and VCs recoup their money by selling their shares. In an acquisition, the project
gets purchased by another company, and VCs get a portion of the sale from their shares. For users,
the downside to these exit strategies is that the focus on lucrativeness could impede the
original goals of the project, as well as augment the cost of services.

## Trials and Tribulations

In some cases, an acquisition can mean the death of a project. One such acquisition that occurred
last year involved Skiff, which advertised itself as a private email service. Skiff raised
[$14.2 million in venture capital before being acquired by Notion](https://arstechnica.com/gadgets/2024/02/encrypted-email-service-skiff-gets-acquired-will-shut-down-in-six-months/).
Subsequently, Skiff was shut down by Notion, which forced users to migrate their emails to a
different provider.

In other cases, an acquisition can diminish a project's reputation and put its core values into
question. An example of this is Keybase, a service that offers encrypted messaging, file-sharing
capabilities, and identity verification using cryptographic keys. In 2015, Keybase raised
[$10.8 million in a Series A round](https://keybase.io/blog/2015-07-15/keybase-raises-series-a).
5 years later, Keybase was
[acquired by Zoom](https://www.zoom.com/en/blog/zoom-acquires-keybase-and-announces-goal-of-developing-the-most-broadly-used-enterprise-end-to-end-encryption-offering/),
a company frequently embroiled in controversy over
[privacy concerns](https://www.nbcnews.com/tech/innovation/zoom-ai-privacy-tos-terms-of-service-data-rcna98665).
Akin to Skiff, the frontend clients are open source, but the backend is not, which makes it
difficult for users to self-host servers and gives Zoom centralized ownership over the
server-side components.

## Planning an Exit Strategy... For Users

It is important to choose a sustainable project when integrating it into your workflow. The
benefit of open-source code is that self-hosted alternatives can be created through modifications
or reverse-engineering the backend. Take the Bitwarden password manager and the Tailscale mesh
network, for example. Self-hosted alternatives to these services are
[Vaultwarden](https://github.com/dani-garcia/vaultwarden) and
[Headscale](https://github.com/juanfont/headscale), respectively. If the original project
implements something that users don't like (such as invasive telemetry), it can be removed in the
community-maintained, self-hosted version. Even if you don't want to or have the means to
self-host, there are other options, such as [KeePassXC](https://keepassxc.org/) or
[WireGuard](https://www.wireguard.com/), that can serve as viable alternatives.

For email providers, it can be wise to use a custom domain. If an email service shuts down,
transferring the custom domain to a new email provider is relatively simple compared to manually
changing the email addresses on each of your accounts one by one. Increasing the liquidity of your
data (how easily your data can be transferred to a different service) is a great way to avoid
funneling your eggs into one basket.

Open-source projects that take on VC funding can be high-risk, but it is
important to note that not all VC-funded projects undergo an exit. For example, Proton received VC
funding early on but is
[no longer beholden to VC investors](https://proton.me/blog/sustaining-mission-over-time).
Regardless, the best choice is to not rely on the longevity of any such project. Instead,
experiment with community-maintained alternatives, even if you don't intend to switch right away.
Taking steps now can ensure that if a project fizzles out, users aren't left scrambling in the
dark.
