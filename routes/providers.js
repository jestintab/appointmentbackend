const router = require('express').Router();
let Provider = require('../models/provider.model');

router.route('/').get((req,res) => {
    Provider.find()
        .then(providers => res.json(providers))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/slots/:id').get((req,res) => {
    Provider.findById(req.params.id)
        .then(data => res.json(data.slots))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const provider_status = 1;
    const slots = req.body.slots;
    const newProvider = new Provider({
        username,
        slots,
        status

    });

    newProvider.save()
        .then(providers => res.json('Provider Added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});



router.route('/slot/:id').post((req,res) => {
    Provider.findById(req.params.id)
            .then(data =>{
              data.slots.push(req.body.slot);
              
            data.save()
            .then(providers => res.json({
              alertmsg:  'New Slot Added for ' + providers.username,
              newslots: providers.slots,
            }))
            .catch(err => res.status(400).json('Error: ' + err));
            })
        });

router.route('/slotupdate/:id/').post((req, res) => {
            Provider.findById(req.params.id)
                .then(data => {
                    data.status = req.body.status;
                    data.slot_id = req.body.slot_id;
                    let item = data.slots.id(data.slot_id);
                   item.slot_status=data.status;
                   data.save()
                        .then(providers => res.json({
                             alertmsg: 'Slot status updated for ' + providers.username,
                             newslots: providers.slots,
                        }))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
            });
router.route('/slotrequest/:id/').post((req, res) => {
            Provider.findById(req.params.id)
                .then(data => {
                    data.status = req.body.status;
                    data.slot_id = req.body.slot_id;
                    data.requester = req.body.requester;
                    let item = data.slots.id(data.slot_id);
                   item.slot_status=data.status;
                   item.requester = data.requester;
                   data.save()
                        .then(providers => res.json({
                             alertmsg: 'Appointment requested for ' + providers.username,
                             newslots: providers.slots,
                        }))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
            });
    
   
    


module.exports = router;