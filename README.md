# Proof of Learn Resource Proposals

This repository is designed to enable creators to contribute educational resources to the Proof of Learn (POL) platform. POL empowers learners by providing interactive, blockchain-certified learning experiences. By following the outlined process, creators can stake, validate, and publish their resources, which will be rewarded with POL POAP NFT badges and become part of the broader educational ecosystem. The goal is to make quality learning materials accessible while ensuring their authenticity through blockchain verification.
## Prerequisite

To add a resource to POAP, the repository must comply with the following template structure:

- **`content` folder**: This folder contains all the Markdown content related to the resource.
- **`poap` folder**: This folder holds the metadata and the POL POAP NFT badge art.
- **`quest.config.json`**: A configuration file that defines the structure and details of the quest.

Ensure that your repository adheres to this template to successfully integrate with POAP.

## Creating a new proposal

Use this repo to create a proposal (GitHub Issue) that will allow the community and POL to confirm the resource and content on the POL platform

1. **Create a Repository**  
    Start by creating a GitHub repository containing the resource. Ensure it adheres to the required template structure outlined in the prerequisites.
    
2. **Stake on POL**  
    Stake 10 OC (Open Campus token) on the POL contract and record the **transaction hash**. This stake is necessary to verify your commitment to the platform.
    
3. **Create an Issue**  
    Open a GitHub issue in the repository for the resource. This issue will serve as a tracking tool for the validation process.
    
4. **Stage 1: In Progress**
    
    - The issue will be labeled as `in progress` in this stage.
    - A POL member will review the resource to validate its authenticity and ensure it is accessible and complete. The community can also contribute during this stage to determine if the resource should be accepted into POL.
    - The recorded **transaction hash** will be verified automatically by an action to confirm the staking.
5. **Validation and Completion**
    
    - If the resource passes the validation, the issue will be updated to `completed` status. It will remain open for a certain period (X hours) to allow for further community review.
    - Once the review period concludes, closing the issue with the `complete` label will trigger an action that stores the resource metadata on POL, making it accessible on the platform.

By following this process, your resource will become part of the Proof of Learn (POL) ecosystem.

## Status Terms

TODO