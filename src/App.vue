<script setup>
import OCISFooter from './components/OCISFooter.vue';
import OCISHeader from './components/OCISHeader.vue';

import img from './assets/image/banner.webp';
import { ref } from 'vue';
import Swiper from './components/Swiper.vue';
import ContactForm from './components/ContactForm.vue';
import PricingCard from './components/PricingCard.vue';
import Lightbox from './components/Lightbox.vue';
import { formatCurrency } from './composables';
import Typewriter from './components/Typewriter.vue';
import { CheckCheck, CircleCheckBigIcon, CircleQuestionMarkIcon } from 'lucide-vue-next';
// import screenshot from '~/assets/image/banner.webp';
const screenshot = ref('/ocis-ghana/web-bg.jpg');

const pricingTiers = ref([
  {
    name: 'Free',
    price: formatCurrency(0),
    period: '1 month',
    description: 'A demo version for getting started. It provides essential tools for managing members and basic communications at no cost.',
    features: [
      'Up to 100 Members',
      'Up to 1 Administrator',
      'Up to 1 Branch',
      'Free 25 SMS units',
      'Available for 1 month period',
      'Limited features',
    ],
    isPopular: false,
    buttonText: 'Get Started',
    buttonLink: '#signup-basic'
  },
  {
    name: 'Basic',
    price: formatCurrency(1190),
    period: '1 year',
    description: "Designed for small but growing churches, this package adds crucial tools for event listing and reporting. It's the ideal choice to streamline your church's day-to-day operations.",
    features: [
      'Up to 650 Members',
      'Up to 15 Admins',
      'Up to 5 Branches',
      'Free 1,000 SMS units',
      'Event Listing',
      'Online Support',
      'All other Basic Core Features'
    ],
    isPopular: false,
    buttonText: 'Get Started',
    buttonLink: '#signup-basic'
  },
  {
    name: 'Standard',
    price: formatCurrency(2590),
    period: '1 year',
    description: "Our most popular plan, offering a comprehensive suite for established congregations. This package includes advanced communication tools, event scheduling, and detailed financial reporting.",
    features: [
      'Up to 2,000 Members',
      'Up to 45 Admins, 120 data officers',
      'Up to 15 Branches',
      'Free 3,000 SMS units',
      'Custom SMS Sender ID',
      'Free 1 email account - yourchurch@ocisghana.com',
      'Event Management',
      'Online Support',
      'All other Standard Features',
    ],
    isPopular: true,
    buttonText: 'Choose Standard',
    buttonLink: '#signup-standard'
  },
  {
    name: 'Premium',
    price: formatCurrency(5990),
    period: '1 year',
    description: 'Powerful features for large churches and ministries.',
    features: [
      'Up to 5,600 Members',
      'Up to 70 Admins, 100 data officers',
      'Up to 35 Branches',
      'Free 5,000 SMS units',
      'Custom SMS Sender ID',
      'Free 1 email account - yourchurch@ocisghana.com',
      'Event Management',
      'Online Support',
      'All other Premium Features',
    ],
    isPopular: false,
    buttonText: 'Go Premium',
    buttonLink: '#signup-premium'
  },
  {
    name: 'Enterprise',
    price: formatCurrency(15900),
    period: '1 year',
    description: 'Tailored solutions for mega-churches, large denominations, national/international church organizations.',
    features: [
      'Unlimited Members - up to 3.5 Million',
      'Up to 5,050 Admins, 15,000 data officers',
      'Up to 1,500 Branches',
      'Free 20,000 SMS units',
      'Custom SMS Sender ID',
      'Free email account - yourchurch@ocisghana.com',
      'Dedicated custom subdomain - yourchurch.ocisghana.com',
      'Advanced Event Management',
      'Online & In-person Support',
      'All other Enterprise Features',
    ],
    isPopular: false,
    isEnterprise: true,
    buttonText: 'Contact Sales',
    buttonTextTitle: 'Starting at GH₵ 12,000 per annum',
    buttonLink: '#contact-sales'
  }
]);

const isLightboxOpen = ref(false);
const currentImage = ref(null);
const currentImageAlt = ref(null);

const openLightbox = (image, t) => {
  currentImage.value = image;
  currentImageAlt.value = t
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  currentImage.value = null;
  currentImageAlt.value = null
};
</script>

<template>
  <OCISHeader />
  <div class="layout ocis-banner relative" style="max-width: 992px;">
    <Typewriter text="Online Church Information System Ghana: Your Digital Church Partner." />
    <div class="layout-fluid px-0 h-100">
      <Swiper :item-count="4" :show-controls="true" :show-indicators="true" autoplay :interval="8000">
        <template v-slot="{ index, isActive }">
          <div v-show="index === 0">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 glass py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  . membership & directory
                </h4>
              </div>
              <div class="px-5">
                <h6 class="mt-4 text-warning">Problem?</h6>
                <p>
                  Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
                  It's
                  hard to know who's new, who's in which ministry, or how to contact them quickly.
                </p>
                <h6 class="mt-4 text-success">Solution</h6>
                <p>
                  The Membership & Directory module is your church's single source of truth. Manage member profiles, and
                  assign people to ministries or groups with a few clicks. Our intuitive search and
                  filtering tools make it easy to find a volunteer, check on a family, or welcome a newcomer.
                </p>
                <h6 class="mt-4">
                  Key Features
                </h6>
                <ul style="list-style-position: inside;">
                  <li>Centralized Member Database</li>

                  <li> Family Grouping</li>

                  <li> Customizable Member Fields</li>

                  <li> Advanced Search & Filtering</li>
                </ul>
              </div>
              <div class="px-5 d-none lg:d-block">
                <img :src="screenshot" alt="" />
              </div>
            </div> -->
            <img :src="img" alt="" id="home" class="rounded-2 banner" />

          </div>
          <div v-show="index === 1">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 glass py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  .. financial management
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4 text-warning">Problem?</h6>
                <p>
                  Managing tithes, offerings, and church expenses can be complex and time-consuming. Ensuring
                  transparency and providing giving statements to members is a major challenge, especially with a mix of
                  cash, cheque, and mobile money payments.
                </p>
                <h6 class="mt-4 text-success">Solution</h6>
                <p>
                  Our Financial Management module simplifies church accounting. Accept online giving securely through
                  popular Ghanaian payment methods like Mobile Money, Bank Transfer. Track pledges, record
                  expenses, and generate detailed financial reports to ensure accountability and effortless
                  transparency.
                </p>
                <h6 class="mt-4">
                  Key Features
                </h6>
                <ul style="list-style-position: inside;">
                  <li>Secure Online Giving (Mobile Money enabled)</li>

                  <li>Pledge Management</li>

                  <li>Expense Tracking & Reporting</li>

                  <li>Automated Giving Statements</li>
                </ul>
              </div>
              <div class="px-5 d-none lg:d-block">
                <img :src="screenshot" alt="" />
              </div>
            </div> -->
            <img :src="img" alt="" id="home" class="rounded-2 banner" />

          </div>
          <div v-show="index === 2">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 glass py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  ... branch module
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4 text-warning">Problem?</h6>
                <p>
                  Managing multiple church branches or campuses can be a significant administrative challenge. Without a
                  centralized system, each branch often operates in a silo, leading to inconsistent data, duplicated
                  efforts, and a lack of unified oversight. This can make it difficult for leadership to get a clear,
                  real-time picture of the church's overall health and growth.
                </p>
                <h6 class="mt-4 text-success">Solution</h6>
                <p>
                  The Branch Management module centralizes and unifies all administrative data across every one of your
                  church's locations. It provides a single dashboard for leadership to oversee operations, ensuring
                  consistency, streamlining communication, and empowering each branch to thrive while remaining
                  connected to the central vision.
                </p>
                <h6 class="mt-4  text-success">
                  Key Features
                </h6>
                <ul style="list-style-position: inside;">
                  <li>Unified Dashboard & Centralized Data</li>

                  <li>Role-Based Access</li>

                  <li>Branch-Specific Reporting</li>

                  <li>Inter-Branch Communication</li>
                </ul>
              </div>
              <div class="px-5 d-none lg:d-block">
                <img :src="screenshot" alt="" />
              </div>
            </div> -->
            <img :src="img" alt="" id="home" class="rounded-2 banner" />
          </div>
          <div v-show="index === 3">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 glass py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  .... Communication & Engagement
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4 text-warning">Problem?</h6>
                <p>
                  How do you keep your entire church body informed? Mass communication via phone calls or individual
                  messages is inefficient. It's difficult to send targeted messages to specific groups like the youth or
                  ushering ministry.
                </p>
                <h6 class="mt-4 text-success">Solution</h6>
                <p>
                  Communication becomes effortless with our platform. Send personalized mass SMS and email broadcasts to
                  your entire congregation or to specific groups and ministries. Set up automated messages for
                  birthdays, anniversaries, or new member follow-ups. Our prayer request portal also creates a safe
                  space for your members to share their needs.
                </p>
                <h6 class="mt-4">
                  Key Features
                </h6>
                <ul style="list-style-position: inside;">
                  <li>Mass SMS & Email Broadcasting</li>

                  <li>Targeted Group Messaging</li>

                  <li>Automated Welcome Messages</li>

                  <li>Prayer Request Portal</li>
                </ul>
              </div>
              <div class="px-5 d-none lg:d-block">
                <img :src="screenshot" alt="" />
              </div>
            </div> -->
            <img :src="img" alt="" id="home" class="rounded-2 banner" />
          </div>
        </template>
      </Swiper>
    </div>
  </div>
  <div class="layout" style="max-width: 992px;">
    <div class="my-8 glass">
      <h1 class="text-capitalize text-xl mt-4" id="about">
        about OCIS GHANA
      </h1>
      <p class="py-3">
        Online Church Information System Ghana (OCIS-GHANA) is a flagship project by <a class="text-success"
          href="//eaglesoftghana.github.io" target="_blank" referrerpolicy="origin">Eaglesoft Ghana.</a>
      </p>
      <p class="py-3">
        Our journey began with a simple but powerful observation: a deep passion for ministry and a commitment to
        leveraging technology to serve the church. We saw a growing need for a modern, reliable, and easy-to-use system
        that could help churches of all sizes in Ghana overcome the administrative challenges that often distract from
        their core mission.
      </p>
      <p class="py-3">
        Developed right here in Ghana, our platform is a comprehensive cloud-based solution designed to streamline the
        operations of churches and religious organizations. We are more than just a software provider; we are partners
        in
        ministry, dedicated to empowering church leaders to focus on what truly matters: serving their congregations and
        spreading the Gospel.
      </p>
      <p class="py-3">
        At <a class="text-success" href="//eaglesoftghana.github.io" target="_blank" referrerpolicy="origin">Eaglesoft
          Ghana</a>, we
        are committed to providing a secure, intuitive, and locally supported solution that understands the unique needs
        of the Ghanaian church community. Our system seamlessly integrates key functions—from managing your members to
        tracking your finances—all within a single platform.
      </p>
    </div>
    <div class="my-8">
      <h4 class="text-capitalize text-xl mt-4" id="features">
        Core Features of OCIS GHANA
      </h4>
      <p class="py-3">
        Our platform is a modular powerhouse, built to handle every aspect of modern church management. Each module is
        carefully designed to solve a specific problem, providing you with the tools you need to connect your
        congregation and grow your ministry with confidence.
      </p>
      <ul class="list-unstyled">
        <li class="my-5">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> Membership & directory
          </h4>

          <p class="my-3">
            Managing your congregation shouldn't be a challenge. With our Members module, you can centralize all
            member
            data into a single, secure database. Easily add new members, update contact details, and link family
            members
            together. Quickly find who you're looking for with a powerful search, and get a clear overview of your
            church's most valuable asset: its people.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
          <div class="p-5">
            <h6 class="text-warning text-base flex items-center">
              <CircleQuestionMarkIcon />
            </h6>
            <p>
              Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
              It's
              hard to know who's new, who's in which ministry, or how to contact them quickly.
            </p>
            <h6 class="mt-4 text-success text-base flex items-center">
              <CircleCheckBigIcon />
            </h6>
            <p>
              The Membership & Directory module is your church's single source of truth. Manage member profiles, and
              assign people to ministries or groups with a few clicks. Our intuitive search and
              filtering tools make it easy to find a volunteer, check on a family, or welcome a newcomer.
            </p>
            <h6 class="mt-4 text-base">
              Key Features
            </h6>
            <ul style="list-style-position: inside;">
              <li>Centralized Member Database</li>

              <li> Family Grouping</li>

              <li> Customizable Member Fields</li>

              <li> Advanced Search & Filtering</li>
            </ul>
          </div>
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> Branch Management module
          </h4>

          <p class="my-3">
            For churches with a vision to expand, this module is essential. Seamlessly manage multiple church branches
            or
            campuses from one central platform. Branch Management allows you to oversee administrative tasks, share
            resources, and synchronize data across all your locations. It ensures consistent standards and provides a
            unified view of your ministry's growth, no matter how many branches you establish.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
          <div class=" rounded-2 p-5">
            <h6 class="text-warning text-base flex items-center">
              <CircleQuestionMarkIcon />
            </h6>
            <p>
              Managing multiple church branches or campuses can be a significant administrative challenge. Without a
              centralized system, each branch often operates in a silo, leading to inconsistent data, duplicated
              efforts, and a lack of unified oversight. This can make it difficult for leadership to get a clear,
              real-time picture of the church's overall health and growth.
            </p>
            <h6 class="mt-4 text-success text-base flex items-center">
              <CircleCheckBigIcon />
            </h6>
            <p>
              The Branch Management module centralizes and unifies all administrative data across every one of your
              church's locations. It provides a single dashboard for leadership to oversee operations, ensuring
              consistency, streamlining communication, and empowering each branch to thrive while remaining
              connected to the central vision.
            </p>
            <h6 class="mt-4  text-success text-base">
              Key Features
            </h6>
            <ul style="list-style-position: inside;">
              <li>Unified Dashboard & Centralized Data</li>

              <li>Role-Based Access</li>

              <li>Branch-Specific Reporting</li>

              <li>Inter-Branch Communication</li>
            </ul>
          </div>
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> Assets & equipments management module
          </h4>

          <p class="my-3">
            Keep a detailed and organized inventory of all your church's physical assets—from sound equipment and
            musical
            instruments to vehicles and property. Our Assets module helps you track every item, ensuring nothing is
            lost
            or unaccounted for. You can easily manage maintenance schedules, assign items to departments, and generate
            reports for a clear picture of your church's resources
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> Departments & Ministries module
          </h4>

          <p class="my-3">
            Every great church is built on the efforts of its dedicated departments and ministries. This module gives
            you
            the tools to organize, lead, and communicate with your ministry teams. Create and manage departments like
            Ushers, Choir, or the Youth Ministry, assign leaders, and keep a clear record of team members. It
            simplifies
            coordination, empowering your ministry leaders to serve effectively.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> events management module
          </h4>

          <p class="my-3">
            Coordinating church events, from weekly fellowship meetings to large conferences, is now effortless. Our
            Events Management module provides all the tools you need to plan, promote, and execute your activities.
            Create
            detailed event pages, track attendance, and send targeted communications to attendees. Everything from
            registration to follow-up is streamlined, ensuring your events are successful and well-attended.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> communication module
          </h4>
          <p class="my-3">
            Connecting with your congregation has never been easier. The Communication module provides a powerful
            suite of tools to ensure your message is always heard. Send personalized mass SMS and email broadcasts to
            your
            entire
            church or use our smart filters to reach specific groups, departments, or ministries. You can also set up
            automated messages for birthdays, anniversaries, or new member follow-ups, making every member feel valued
            and
            engaged. This module saves time and ensures a strong, consistent connection with your entire church body.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
          <div class=" rounded-2 p-5">
            <h6 class="text-warning text-base flex items-center">
              <CircleQuestionMarkIcon />
            </h6>
            <p>
              How do you keep your entire church body informed? Mass communication via phone calls or individual
              messages is inefficient. It's difficult to send targeted messages to specific groups like the youth or
              ushering ministry.
            </p>
            <h6 class="mt-4 text-success text-base flex items-center">
              <CircleCheckBigIcon />
            </h6>
            <p>
              Communication becomes effortless with our platform. Send personalized mass SMS and email broadcasts to
              your entire congregation or to specific groups and ministries. Set up automated messages for
              birthdays, anniversaries, or new member follow-ups. Our prayer request portal also creates a safe
              space for your members to share their needs.
            </p>
            <h6 class="mt-4 text-base">
              Key Features
            </h6>
            <ul style="list-style-position: inside;">
              <li>Mass SMS & Email Broadcasting</li>

              <li>Targeted Group Messaging</li>

              <li>Automated Welcome Messages</li>

              <!-- <li>Prayer Request Portal</li> -->
            </ul>
          </div>
        </li>
        <li class="py-3">
          <h4 class="text-uppercase text-success font-bold text-base flex items-center justify-center">
            <CheckCheck class="" /> finance module
          </h4>
          <p class="my-3">
            Gain full transparency and control over your church's finances. The Finance module simplifies the
            management
            of giving, offerings, and expenses. Easily record and categorize all financial transactions. Most
            importantly,
            it enables secure online giving through popular Ghanaian payment platforms, providing your members with a
            convenient way to support the church. Generate comprehensive financial reports to ensure accountability
            and
            effortless planning.
          </p>
          <img @click="openLightbox(img)" @contextmenu.prevent class="img-screenshot rounded-2" :src="img" alt="" />
          <div class=" rounded-2 pb-0 p-5">
            <h6 class="text-warning text-base flex items-center">
              <CircleQuestionMarkIcon />
            </h6>
            <p>
              Managing tithes, offerings, and church expenses can be complex and time-consuming. Ensuring
              transparency and providing giving statements to members is a major challenge, especially with a mix of
              cash, cheque, and mobile money payments.
            </p>
            <h6 class="mt-4 text-success text-base flex items-center">
              <CircleCheckBigIcon />
            </h6>
            <p>
              Our Financial Management module simplifies church accounting. Accept online giving securely through
              popular Ghanaian payment methods like Mobile Money, Bank Transfer. Track pledges, record
              expenses, and generate detailed financial reports to ensure accountability and effortless
              transparency.
            </p>
            <h6 class="mt-4 text-base">
              Key Features
            </h6>
            <ul style="list-style-position: inside;">
              <li>Secure Online Giving (Mobile Money enabled)</li>

              <li>Pledge Management</li>

              <li>Expense Tracking & Reporting</li>

              <li>Automated Giving Statements</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-8">
      <h4 class="text-capitalize text-xl mt-4" id="pricing">
        Pricing & packages
      </h4>
      <PricingCard :tiers="pricingTiers" />
    </div>
    <div class="my-6">
      <h4 class="text-capitalize text-xl mt-4" id="contact">
        Contact & enquiry
      </h4>
      <p class="mt-3">
        We're here to help you get the most out of <span>
          Online Church Information System Ghana. </span>
        Whether you have a question about our features, need assistance with pricing, or want a personalized demo, our
        team at <a class="text-success" href="//eaglesoftghana.github.io" target="_blank"
          referrerpolicy="origin">Eaglesoft Ghana</a>
        is ready to assist you.
      </p>
      <ContactForm />
    </div>
  </div>
  <Lightbox :isOpen="isLightboxOpen" :src="currentImage" :alt="currentImageAlt" @close="closeLightbox" />
  <OCISFooter />
</template>
<style>
.ocis-banner {
  margin-top: 75px;
}

@media (min-width: 768px) {
  .ocis-banner {
    margin-top: 105px;
  }
}

.banner {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none !important;
}

img.img-screenshot {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none !important;

  &:hover {
    cursor: -moz-zoom-in;
    cursor: zoom-in;
  }
}
</style>