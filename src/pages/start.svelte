<script>
  // imports
  import { profile } from "../store.js";
  import { Othent } from "permawebjs/auth";

  async function handleConnect() {
    //Othent is library that helps onboard masses to ecosystem w/ email address or google acc
    //call logIn function and it returns details of connected user
    //we store it in profiel variable
    $profile = await Othent.logIn();
  }
</script>

<!-- landing page ui -->
<main>
  <section class="hero min-h-screen bg-base-100">
    <div class="hero-content flex-col space-y-16">
      <h1 class="text-8xl font-bold hover:text-primary">ArGram</h1>
      <p class="text-2xl dark:text-white text-center">
        A decentralised image sharing application on Arweave <br /> that allows
        you to post your images <br /> as atomic assets.
      </p>
      <div class="flex space-x-4">
        <!-- connect button to handle log in -->
        <button class="btn btn-primary" on:click={handleConnect}>Connect</button
        >
      </div>
    </div>
  </section>
</main>
