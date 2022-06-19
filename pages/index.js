import React from 'react'

// show all the created instance of campign contract

import factory from '../etherium/factory.js'

import { useEffect } from 'react'

import { loadGetInitialProps } from 'next/dist/shared/lib/utils.js'

import { Card } from 'semantic-ui-react' // we have to add css separately for sematic-ui component

import { Button } from 'semantic-ui-react'

import { Layout } from '../component/Layout.js'

// next donot allow server fetching of api , to use server fetching of api use the fetching logic in getInitialProps
const index = ({campaigns}) => {


    const renderCampaigns = () =>  {

        const items = campaigns.map(campaign => {

            return {
                header: campaign,
                description: <a>View it man</a>,
                fluid: true
            }
        });


        return items;
    }
   
    useEffect(() => {

       
    })
  return (
    <Layout>
    <div>
        <h3>Campaigns</h3>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
        <Card.Group items = {renderCampaigns()} />

        <Button content = "Create campaign" icon="add" primary/>
    </div>
    </Layout>
    
  )
}

index.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

     console.log(campaigns)

     return { campaigns : campaigns};
  }

export default index