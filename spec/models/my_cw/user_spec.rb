require 'rails_helper'

RSpec.describe MyCw::User, type: :model do
  it 'should be invalid when no ct_id is present' do
    expect(
      FactoryBot.build(:user, ct_id: nil)
    ).to have(1).errors_on(:ct_id)
  end

  it 'should be valid when it has a ct_id' do
    expect(
      FactoryBot.build(:user)
    ).to be_valid
  end

  it 'should be invalid when ct_id is duplicated' do
    FactoryBot.create(:user, ct_id: 1)
    expect(
      FactoryBot.build(:user, ct_id: 1)
    ).to have(1).errors_on(:ct_id)
  end
end
