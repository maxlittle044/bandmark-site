import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------- Reading test ----------
  const readingTest = await prisma.test.create({
    data: {
      skill: "READING",
      title: "Academic Reading Practice — Test 1",
      source: "Bandmark original content",
      durationMin: 20,
      sections: {
        create: [
          {
            order: 1,
            passageText: `Over the past two decades, cities across the world have seen a quiet resurgence of an ancient practice: keeping bees. Rooftops in London, balconies in Tokyo, and community gardens in Toronto now host hives that would once have seemed out of place amid traffic and concrete. Proponents argue that urban beekeeping does more than produce honey; it supports pollination for city parks and allotments, and it offers a rare point of contact between residents and the natural world.

Critics, however, point out that some cities may already have reached their limit for supportable hives. Bees compete for the same limited flowers, and a rooftop crowded with hives can leave wild, native pollinator species with less to forage on. Studies from several major cities have found that where hive density rises quickly, sightings of wild bees and other insects can fall within a few years.

Municipal governments have responded in different ways. Some now require would-be beekeepers to register their hives and complete a short course before receiving a permit, aiming to keep colonies healthy and spaced sensibly. Others have taken a lighter touch, treating beekeeping as a private matter much like keeping a garden. Whichever approach a city takes, most researchers agree on one point: urban beekeeping works best not as an unlimited good but as one part of a broader strategy that also protects wildflowers, hedgerows, and other habitat that all pollinators, kept and wild alike, depend on.`,
            questions: {
              create: [
                { order: 1, type: "multiple_choice", prompt: "According to the passage, urban beekeeping has become popular in…",
                  options: ["only wealthy neighbourhoods", "cities around the world", "only Beijing and Tokyo", "rural areas"],
                  correctAnswer: "cities around the world" },
                { order: 2, type: "true_false_not_given", prompt: "All researchers agree that cities should ban urban beekeeping.",
                  options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE" },
                { order: 3, type: "true_false_not_given", prompt: "A high density of hives can reduce sightings of wild pollinator species.",
                  options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE" },
                { order: 4, type: "sentence_completion",
                  prompt: "Some cities require beekeepers to register their hives and complete a ______ before getting a permit.",
                  correctAnswer: ["course", "short course"] },
                { order: 5, type: "multiple_choice", prompt: "What do most researchers agree is the best approach to urban beekeeping?",
                  options: ["Unlimited hives everywhere", "Banning it entirely", "Treating it as one part of a wider strategy that protects habitat", "Ignoring wild pollinators"],
                  correctAnswer: "Treating it as one part of a wider strategy that protects habitat" },
              ],
            },
          },
          {
            order: 2,
            passageText: `Long before search engines existed, public libraries served as the primary tool by which ordinary people could access information they could not otherwise afford. The first tax-funded public library systems appeared in the mid-nineteenth century, built on the idea that a literate, informed public benefited everyone, not just the individual reader. Despite predictions over the past thirty years that libraries would become obsolete once information moved online, usage figures in many countries tell a different story.

In several national surveys, in-person library visits have remained remarkably stable even as e-book and audiobook borrowing has grown alongside them, rather than replacing them. Librarians suggest this is because libraries offer something a search engine cannot: a quiet, free public space, along with staff trained to help patrons evaluate sources — a service that has become more valuable, not less, as false and misleading information has spread online.

Funding, however, remains a persistent challenge. Because libraries are usually funded by local government budgets, many have faced repeated rounds of cuts during periods of economic strain, even when visitor numbers hold steady or rise. Some library systems have responded by expanding what they offer beyond books — lending tools, seeds, or even museum passes — in an effort to demonstrate their value to budget committees in terms beyond circulation statistics alone.`,
            questions: {
              create: [
                { order: 6, type: "true_false_not_given", prompt: "Libraries have become less popular since e-books were introduced.",
                  options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE" },
                { order: 7, type: "multiple_choice", prompt: "Why do librarians think physical libraries remain valuable?",
                  options: ["They are the only place with books", "They offer free space and help evaluating sources", "They are required by law", "They are more affordable than the internet"],
                  correctAnswer: "They offer free space and help evaluating sources" },
                { order: 8, type: "true_false_not_given", prompt: "Libraries are typically funded by national government budgets.",
                  options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE" },
                { order: 9, type: "sentence_completion",
                  prompt: "Some libraries now lend items such as tools and ______ in addition to books.",
                  correctAnswer: ["seeds"] },
                { order: 10, type: "multiple_choice", prompt: "When did the first tax-funded public library systems appear?",
                  options: ["Early 20th century", "Mid-nineteenth century", "Ancient Rome", "1990s"],
                  correctAnswer: "Mid-nineteenth century" },
              ],
            },
          },
        ],
      },
    },
  });

  // ---------- Listening test ----------
  const listeningTest = await prisma.test.create({
    data: {
      skill: "LISTENING",
      title: "Listening Practice — Test 1",
      source: "Bandmark original content",
      durationMin: 15,
      sections: {
        create: [
          {
            order: 1,
            transcriptText: `Woman: Good morning, City Cycle Rentals, how can I help you?
Man: Hi, yeah, I'd like to rent a bike for this Saturday, just for the day.
Woman: Sure, we have a few options. Can I get your name first?
Man: It's Daniel Kaplan, that's K-A-P-L-A-N.
Woman: Great, and a contact number?
Man: 0157 226 4489.
Woman: Perfect. Now, would you like a standard bike or an electric one?
Man: What's the price difference?
Woman: A standard bike is fifteen pounds for the day, and an electric bike is twenty-eight pounds.
Man: I'll go with the standard one, thanks.
Woman: Good choice. And where would you like to collect it from? We have locations at Riverside Park and at the Central Station branch.
Man: Riverside Park is closer for me.
Woman: Great, that's booked. One more thing, we do require a twenty pound deposit, refunded when you return the bike undamaged.
Man: That's fine.
Woman: Perfect, you're all set for Saturday.`,
            questions: {
              create: [
                { order: 1, type: "sentence_completion", prompt: "Customer's surname: ______", correctAnswer: ["Kaplan"] },
                { order: 2, type: "sentence_completion", prompt: "Contact number: ______", correctAnswer: ["0157 226 4489", "01572264489"] },
                { order: 3, type: "multiple_choice", prompt: "What type of bike does the man choose?",
                  options: ["Electric bike", "Standard bike", "Tandem bike", "Mountain bike"], correctAnswer: "Standard bike" },
                { order: 4, type: "sentence_completion", prompt: "Collection location: ______", correctAnswer: ["Riverside Park", "Riverside"] },
                { order: 5, type: "sentence_completion", prompt: "Deposit required: £______", correctAnswer: ["20", "twenty", "£20"] },
              ],
            },
          },
          {
            order: 2,
            transcriptText: `Good afternoon everyone, and welcome. My name's Priya, and I'll be your guide for today's walking tour of the old harbour district. Before we set off, let me run through a few details. The tour will take approximately ninety minutes, and we'll cover just over two kilometres, so do wear comfortable shoes. We'll be making three stops along the way: first at the old lighthouse, then at the fish market, which has operated on the same site since eighteen seventy, and finally at the harbour museum, where you'll have some free time to look around before we finish. If you need to leave early for any reason, the nearest exit point is at the fish market, roughly halfway through the route. Please also note that the tour is free for children under five, but everyone else will need a ticket, which you should have already collected from the front desk. If it starts raining, we do have a covered route as a backup, though it's a little shorter. Alright, if everyone's ready, let's begin.`,
            questions: {
              create: [
                { order: 6, type: "sentence_completion", prompt: "Tour guide's name: ______", correctAnswer: ["Priya"] },
                { order: 7, type: "sentence_completion", prompt: "Approximate duration of the tour: ______ minutes", correctAnswer: ["90", "ninety"] },
                { order: 8, type: "multiple_choice", prompt: "Where is the halfway exit point?",
                  options: ["The lighthouse", "The fish market", "The harbour museum", "The front desk"], correctAnswer: "The fish market" },
                { order: 9, type: "sentence_completion", prompt: "The fish market has operated on the same site since ______.", correctAnswer: ["1870", "eighteen seventy"] },
                { order: 10, type: "multiple_choice", prompt: "Who can attend the tour for free?",
                  options: ["Students", "Children under five", "Senior citizens", "Tour guides"], correctAnswer: "Children under five" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeded:", readingTest.title, "and", listeningTest.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
