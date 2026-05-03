<script setup>
</script>

<template>
    <div class="container">
        <svg class="container__close" @click.self="$emit('close')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
        <h3>ADD NEW PROJECT</h3>
        <form>
            <label for="projectName">1. Project Name:</label>
            <input type="text" id="projectName" name="projectName" maxlength="64" required placeholder="Enter the project name">

            <label for="state">2. US State:</label>
            <select id="state" name="state" required placeholder="Select a State">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>

            <label for="client">3. Client Name:</label>
            <input type="text" id="client" name="client" maxlength="64" required placeholder="Enter the client name" >

            <label for="resourceCode">4. Resource Code:</label>
            <input type="number" id="resourceCode" name="resourceCode" max="999999999" placeholder="eg. 123456789">

            <label for="projectType">5. Project Type:</label>
            <select id="projectType" name="projectType" required>
                <option value="type1">DESIGN</option>
                <option value="type2">REPORT</option>
                <option value="type3">QA/QC</option>
                <option value="type4">CONSTRUCTION</option>
            </select>

            <button class="submit-button" type="submit">Add Project</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background: var(--tool-background-color);
    z-index: 100000;
    top: 0;
    left: 0;
}

.container h3 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.container form {
    display: flex;
    flex-direction: column;
    background-color: var(--tool-inner-container-color);
    width: 25rem;
    padding: 2rem;
    border-radius: 0.5rem;
    border: var(--tool-border);
}

.container form input, .container form select {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    border: var(--tool-border);
    border-radius: 0.5rem;
    background-color: var(--tool-input-color);
    color: #fff;

}

.container__close {
    position: absolute;
    top: 1rem;
    right: 2rem;
    padding: 1rem;
    cursor: pointer;
    z-index: 1001;
    fill: var(--primary-color);
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    border: none;
    transition: background-color 0.2s ease-in-out;
}

.container__close:hover, .submit-button:hover {
    fill: var(--primary-color-hover);
}

.submit-button {
    background-color: var(--primary-color);
    color: #000;
    font-weight: bold;
    font-size: 1rem;
    width: 8rem;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 1.5rem;
    border: var(--tool-border);
    border-radius: 0.5rem;
    transition: background-color 0.2s ease-in-out;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.submit-button:hover {
    background-color: var(--primary-color-hover);
}
</style>