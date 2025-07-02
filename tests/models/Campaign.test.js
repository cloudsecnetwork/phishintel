import mongoose from 'mongoose';
import Campaign from '../../models/Campaign.js';

describe('Campaign Model', () => {
  it('should create a campaign with valid data', async () => {
    const validCampaign = {
      name: 'Test Campaign',
      subject: 'Test Subject',
      templateId: new mongoose.Types.ObjectId(),
      audienceId: new mongoose.Types.ObjectId(),
      senderProfileId: new mongoose.Types.ObjectId(),
      status: 'draft'
    };

    const campaign = new Campaign(validCampaign);
    const savedCampaign = await campaign.save();

    expect(savedCampaign._id).toBeDefined();
    expect(savedCampaign.name).toBe(validCampaign.name);
    expect(savedCampaign.subject).toBe(validCampaign.subject);
    expect(savedCampaign.status).toBe(validCampaign.status);
  });

  it('should require name field', async () => {
    const campaignWithoutName = {
      subject: 'Test Subject',
      templateId: new mongoose.Types.ObjectId(),
      audienceId: new mongoose.Types.ObjectId(),
      senderProfileId: new mongoose.Types.ObjectId()
    };

    const campaign = new Campaign(campaignWithoutName);
    let err;

    try {
      await campaign.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('should set default status to draft', async () => {
    const campaignData = {
      name: 'Test Campaign',
      subject: 'Test Subject',
      templateId: new mongoose.Types.ObjectId(),
      audienceId: new mongoose.Types.ObjectId(),
      senderProfileId: new mongoose.Types.ObjectId()
    };

    const campaign = new Campaign(campaignData);
    const savedCampaign = await campaign.save();

    expect(savedCampaign.status).toBe('draft');
  });

  it('should validate status enum values', async () => {
    const campaignData = {
      name: 'Test Campaign',
      subject: 'Test Subject',
      templateId: new mongoose.Types.ObjectId(),
      audienceId: new mongoose.Types.ObjectId(),
      senderProfileId: new mongoose.Types.ObjectId(),
      status: 'invalid-status'
    };

    const campaign = new Campaign(campaignData);
    let err;

    try {
      await campaign.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.status).toBeDefined();
  });
}); 