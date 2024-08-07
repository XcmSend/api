import { Router } from 'express'
import { list_contracts_on_roc_contracts, roc_contract_info } from '../api/ink'

const router = Router()

// list all contracts on a chain
router.get('/list_contracts', async (req, res) => {
  const const_user_chain = req.body.chain // get the chains paraid
  if (const_user_chain != 'rococo_contracts') {
    return res.status(400).json({ error: 'invalid chain, select: rococo_contracts' })
  }
  const contracts = await list_contracts_on_roc_contracts()
  res.json({ contracts: contracts })
})

/*
curl -X POST http://localhost:8080/api/ink/contract_info \
     -H "Content-Type: application/json" \
     -d @- <<EOF
{
  "abiJson": $(cat flipper.json),
  "address": "5GLTeaqe8DqZbqhhzV6i2MdaG5zJbps84KwgjewUVo75gwga"
}
EOF
*/
router.post('/contract_info', async (req, res) => {
  const { abiJson, address } = req.body
  const cinfo = await roc_contract_info(address, abiJson)
  console.log(`cinfo: `, cinfo)
  console.log(`contract_info called`)
  res.json({ sucess: true, description: cinfo })
})

/*
  router.post('/ink/upload_contract')
  
  router.post('/ink/remove_contract', async (req, res) => {
    
    res.json({ success: true, tx: tx })
  })
*/

export default router
