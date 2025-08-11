<script setup>
import img from '~/assets/image/web.webp';

const pricingTiers = ref([
  {
    name: 'Basic',
    price: '₵' + formatNumber(1090),
    period: '/year',
    description: 'Ideal for small churches starting their digital journey.',
    features: [
      'Up to 650 Members',
      'Up to 15 Admins, 25 data officers',
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
    price: '₵' + formatNumber(2590),
    period: '/year',
    description: 'Comprehensive tools for growing congregations.',
    features: [
      'Up to 2,000 Members',
      'Up to 45 Admins, 50 data officers',
      'Up to 15 Branches',
      'Free 3,000 SMS units',
      'Custom SMS Sender ID',
      'Free 1 email account - yourchurch@ocisghana.com',
      'Event Management',
      'Online Support',
      'All other Basic Core Features',
    ],
    isPopular: true,
    buttonText: 'Choose Standard',
    buttonLink: '#signup-standard'
  },
  {
    name: 'Premium',
    price: '₵' + formatNumber(5990),
    period: '/year',
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
      'All other Basic Core Features',
    ],
    isPopular: false,
    buttonText: 'Go Premium',
    buttonLink: '#signup-premium'
  },
  {
    name: 'Enterprise',
    price: '₵' + formatNumber(15900),
    period: '/year',
    description: 'Tailored solutions for mega-churches, large denominations, national/international church organizations.',
    features: [
      'Unlimited Members - up to 3.5 Million',
      'Up to 5,050 Admins, 15,000 data officers',
      'Up to 1,500 Branches',
      'Free 20,000 SMS units',
      'Custom SMS Sender ID',
      'Free 5 email accounts - yourchurch@ocisghana.com',
      'Dedicated custom subdomain - yourchurch.ocisghana.com',
      'Advanced Event Management',
      'Online & In-person Support',
      'All other Basic Core Features',
    ],
    isPopular: false,
    isEnterprise: true,
    buttonText: 'Contact Sales',
    buttonTextTitle: 'Starting at GH₵ 12,000 per annum',
    buttonLink: '#contact-sales'
  }
]);
</script>

<template>
  <div class="bg-overlay relative" :style="{ backgroundImage: `url(${img})` }">
    <div class="layout-fluid h-100" id="home">
      <Swiper :item-count="4" :show-controls="false" :show-indicators="true" autoplay :interval="8000">
        <template v-slot="{ index, isActive }">
          <div v-show="index === 0">
            <div class="grid grid-cols-1 lg:grid-cols-2 border border-gray-900 rounded-2 py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  . membership & directory
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4">Problem?</h6>
                <p>
                  Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
                  It's
                  hard to know who's new, who's in which ministry, or how to contact them quickly.
                </p>
                <h6 class="mt-4">We solved this</h6>
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
                <ImageViewer full-size-src="/screenshot.png" thumbnail-src="/screenshot.png" />
              </div>
            </div>
          </div>
          <div v-show="index === 1">
            <div class="grid grid-cols-1 lg:grid-cols-2 border border-gray-900 rounded-2 py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  .. financials module
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4">Problem?</h6>
                <p>
                  Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
                  It's
                  hard to know who's new, who's in which ministry, or how to contact them quickly.
                </p>
                <h6 class="mt-4">We solved this</h6>
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
                <ImageViewer full-size-src="/screenshot.png" thumbnail-src="/screenshot.png" />
              </div>
            </div>
          </div>
          <div v-show="index === 2">
            <div class="grid grid-cols-1 lg:grid-cols-2 border border-gray-900 rounded-2 py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  ... branch module
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4">Problem?</h6>
                <p>
                  Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
                  It's
                  hard to know who's new, who's in which ministry, or how to contact them quickly.
                </p>
                <h6 class="mt-4">We solved this</h6>
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
                <ImageViewer full-size-src="/screenshot.png" thumbnail-src="/screenshot.png" />
              </div>
            </div>
          </div>
          <div v-show="index === 3">
            <div class="grid grid-cols-1 lg:grid-cols-2 border border-gray-900 rounded-2 py-5">
              <div class="lg:col-span-2 flex items-center justify-start">
                <h4 class="text-uppercase rounded-2 px-5 d-inline-block text-xl text-success">
                  .... communication module
                </h4>
              </div>
              <div class=" rounded-2 px-5">
                <h6 class="mt-4">Problem?</h6>
                <p>
                  Keeping track of a growing congregation's details on paper or in scattered spreadsheets is chaotic.
                  It's
                  hard to know who's new, who's in which ministry, or how to contact them quickly.
                </p>
                <h6 class="mt-4">We solved this</h6>
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
                <ImageViewer full-size-src="/screenshot.png" thumbnail-src="/screenshot.png" />
              </div>
            </div>
          </div>
        </template>
      </Swiper>
    </div>
  </div>
  <div class="layout bg-gray-900" style="max-width: 992px;">
    <div class="my-8">
      <h4 class="text-capitalize mt-4" id="about">
        about OCIS ghana software
      </h4>
      <p class="pt-3">
        Online Church Information System Ghana, (OCIS GHANA), is a flagship project by <nuxt-link class="text-success"
          href="//eaglesoftghana.github.io" external>Eaglesoft Ghana</nuxt-link>
      </p>
      <p class="pt-3">
        Our journey began with a simple but powerful observation: a deep passion for ministry and a commitment to
        leveraging technology to serve the church. We saw a growing need for a modern, reliable, and easy-to-use system
        that could help churches of all sizes in Ghana overcome the administrative challenges that often distract from
        their core mission.
      </p>
      <p class="pt-3">
        Developed right here in Ghana, our platform is a comprehensive cloud-based solution designed to streamline the
        operations of churches and religious organizations. We are more than just a software provider; we are partners
        in
        ministry, dedicated to empowering church leaders to focus on what truly matters: serving their congregations and
        spreading the Gospel
      </p>
      <p class="pt-3">
        At <nuxt-link class="text-success" href="//eaglesoftghana.github.io" external>Eaglesoft Ghana</nuxt-link>, we
        are
        committed to providing a secure, intuitive, and locally supported solution that understands the unique needs of
        the Ghanaian church community. Our system seamlessly integrates key functions—from managing your members to
        tracking your finances—all within a single platform
      </p>
    </div>
    <div class="my-8">
      <h4 class="text-capitalize mt-4" id="features">
        Core Features of OCiMS ghana
      </h4>
      <p class="pt-3">
        Our platform is a modular powerhouse, built to handle every aspect of modern church management. Each module is
        carefully designed to solve a specific problem, providing you with the tools you need to connect your
        congregation
        and grow your ministry with confidence.
      </p>
      <ul style="list-style-position: inside;">
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Members
          </h5>

          <p class="pt-1">
            Managing your congregation shouldn't be a challenge. With our Members module, you can centralize all member
            data into a single, secure database. Easily add new members, update contact details, and link family members
            together. Quickly find who you're looking for with a powerful search, and get a clear overview of your
            church's most valuable asset: its people.
          </p>
          <img oncontextmenu="return false;" class="img-screenshot" src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Branch Management
          </h5>

          <p class="pt-1">
            For churches with a vision to expand, this module is essential. Seamlessly manage multiple church branches
            or
            campuses from one central platform. Branch Management allows you to oversee administrative tasks, share
            resources, and synchronize data across all your locations. It ensures consistent standards and provides a
            unified view of your ministry's growth, no matter how many branches you establish.
          </p>
          <img oncontextmenu="return false;" class="img-screenshot" src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Assets
          </h5>

          <p class="pt-1">
            Keep a detailed and organized inventory of all your church's physical assets—from sound equipment and
            musical
            instruments to vehicles and property. Our Assets module helps you track every item, ensuring nothing is lost
            or unaccounted for. You can easily manage maintenance schedules, assign items to departments, and generate
            reports for a clear picture of your church’s resources
          </p>
          <img oncontextmenu="return false;" class="img-screenshot" src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Departments & Ministries
          </h5>

          <p class="pt-1">
            Every great church is built on the efforts of its dedicated departments and ministries. This module gives
            you
            the tools to organize, lead, and communicate with your ministry teams. Create and manage departments like
            Ushers, Choir, or the Youth Ministry, assign leaders, and keep a clear record of team members. It simplifies
            coordination, empowering your ministry leaders to serve effectively.
          </p>
          <img oncontextmenu="return false;" class="img-screenshot" src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Events Management
          </h5>

          <p class="pt-1">
            Coordinating church events, from weekly fellowship meetings to large conferences, is now effortless. Our
            Events Management module provides all the tools you need to plan, promote, and execute your activities.
            Create
            detailed event pages, track attendance, and send targeted communications to attendees. Everything from
            registration to follow-up is streamlined, ensuring your events are successful and well-attended.
          </p>
          <img oncontextmenu="return false;" class="img-screenshot" src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            communication
          </h5>
          <p class="pt-1">
            Connecting with your congregation has never been easier. The Communication module provides a powerful suite
            of
            tools to ensure your message is always heard. Send personalized mass SMS and email broadcasts to your entire
            church or use our smart filters to reach specific groups, departments, or ministries. You can also set up
            automated messages for birthdays, anniversaries, or new member follow-ups, making every member feel valued
            and
            engaged. This module saves time and ensures a strong, consistent connection with your entire church body.
          </p>
          <img src="/screenshot.png" alt="" />
        </li>
        <li class="pt-3">
          <h5 class="d-inline text-uppercase text-success">
            Finance
          </h5>
          <p class="pt-1">
            Gain full transparency and control over your church's finances. The Finance module simplifies the management
            of giving, offerings, and expenses. Easily record and categorize all financial transactions. Most
            importantly,
            it enables secure online giving through popular Ghanaian payment platforms, providing your members with a
            convenient way to support the church. Generate comprehensive financial reports to ensure accountability and
            effortless planning.
          </p>
          <img src="/screenshot.png" alt="" />
        </li>
      </ul>
    </div>
    <div class="my-8">
      <h4 class="text-capitalize mt-4" id="pricing">
        Pricing
      </h4>
      <PricingCard :tiers="pricingTiers" />
    </div>
    <div class="my-6">
      <h4 class="text-capitalize mt-4" id="contact">
        Contact
      </h4>
      <p class="mt-3">
        We're here to help you get the most out of <span>
          Online Church Information Management System Ghana. </span>
        Whether you have a question about our features, need assistance with pricing, or want a personalized demo, our
        team at Eaglesoft Ghana is ready to assist you
      </p>
      <h5 class="text-capitalize mt-3">
      </h5>
      <ContactForm />
    </div>
  </div>
</template>

<style>
img,
.img-screenshot {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none !important;
}
</style>
<style scoped>
.bg-overlay {
  height: 100vh;
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.55);
  background-blend-mode: multiply;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.glass {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>