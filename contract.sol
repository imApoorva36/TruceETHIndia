// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OrganizationNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private organizationIdCounter;

    // Struct to store organization details
    struct Organization {
        string name;
        string description;
        address addressOfOrg;
        uint256 funds;
    }

    // Mapping from organization ID to organization details
    mapping(uint256 => Organization) private organizations;

    // Event to log organization registration
    event OrganizationRegistered(
        uint256 organizationId,
        string name,
        string description,
        address addressOfOrg
    );

    // Event to log funds sent to an organization
    event FundsSent(uint256 organizationId, uint256 amount);

    // Constructor initializes the NFT with a name and symbol
    constructor() ERC721("OrganizationNFT", "ORG") {}

    // Function to register an organization and mint an NFT
    function registerOrganization(
        string memory _name,
        string memory _description,
        address _addressOfOrg
    ) external {
        require(bytes(_name).length > 0, "Organization name cannot be empty");
        require(
            bytes(_description).length > 0,
            "Organization description cannot be empty"
        );

        // Mint a new NFT for the organization
        uint256 newOrganizationId = organizationIdCounter.current();
        _safeMint(msg.sender, newOrganizationId);

        // Store organization details
        organizations[newOrganizationId] = Organization({
            name: _name,
            description: _description,
            addressOfOrg: _addressOfOrg,
            funds: 0
        });

        // Increment the organization ID counter
        organizationIdCounter.increment();

        emit OrganizationRegistered(
            newOrganizationId,
            _name,
            _description,
            _addressOfOrg
        );
    }

    // Function to get organization details by ID
    function getOrganizationDetails(uint256 _organizationId)
        external
        view
        returns (
            string memory name,
            string memory description,
            address addressOfOrg,
            uint256 funds
        )
    {
        Organization storage org = organizations[_organizationId];
        return (org.name, org.description, org.addressOfOrg, org.funds);
    }

    // Function to get organization details by wallet address
    function getOrganizationDetailsByAddress(address _walletAddress)
        external
        view
        returns (
            uint256 organizationId,
            string memory name,
            string memory description,
            uint256 funds
        )
    {
        for (uint256 i = 0; i < organizationIdCounter.current(); i++) {
            Organization storage org = organizations[i];
            if (org.addressOfOrg == _walletAddress) {
                return (i, org.name, org.description, org.funds);
            }
        }
        revert("Organization not found for the given address");
    }

    // Function to get all organization details
    function getAllOrganizations()
        external
        view
        returns (Organization[] memory)
    {
        Organization[] memory allOrganizations = new Organization[](
            organizationIdCounter.current()
        );

        for (uint256 i = 0; i < organizationIdCounter.current(); i++) {
            Organization storage org = organizations[i];
            allOrganizations[i] = org;
        }

        return allOrganizations;
    }

    // Function to allow contributors to send funds to an organization
    function sendFunds(uint256 _organizationId) external payable {
        Organization storage org = organizations[_organizationId];
        require(org.addressOfOrg != address(0), "Organization does not exist");
        require(msg.value > 0, "Sent funds must be greater than 0");

        // Update organization funds
        org.funds += msg.value;

        // Emit event
        emit FundsSent(_organizationId, msg.value);
    }
}
