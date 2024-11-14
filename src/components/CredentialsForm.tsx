import { useState } from 'react';
import './CredentialsForm.css';

interface CredentialsFormProps {
  onSubmit: (credentials: {
    fbAppId: string;
    fbAppSecret: string;
    fbAccessToken: string;
    adAccountId: string;
    telegramBotToken: string;
    telegramGroupId: string;
  }) => void;
}

export const CredentialsForm = ({ onSubmit }: CredentialsFormProps) => {
  const [formData, setFormData] = useState({
    fbAppId: '',
    fbAppSecret: '',
    fbAccessToken: '',
    adAccountId: '',
    telegramBotToken: '',
    telegramGroupId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting credentials:', formData);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting credentials:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="credentials-form-container">
      <form onSubmit={handleSubmit} className="credentials-form">
        <h2>Enter Your Credentials</h2>
        
        <div className="form-group">
          <label htmlFor="fbAppId">Facebook App ID</label>
          <input
            type="text"
            id="fbAppId"
            name="fbAppId"
            value={formData.fbAppId}
            onChange={handleChange}
            required
            placeholder="Enter your Facebook App ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fbAppSecret">Facebook App Secret</label>
          <input
            type="password"
            id="fbAppSecret"
            name="fbAppSecret"
            value={formData.fbAppSecret}
            onChange={handleChange}
            required
            placeholder="Enter your Facebook App Secret"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fbAccessToken">Facebook Access Token</label>
          <input
            type="password"
            id="fbAccessToken"
            name="fbAccessToken"
            value={formData.fbAccessToken}
            onChange={handleChange}
            required
            placeholder="Enter your Facebook Access Token"
          />
        </div>

        <div className="form-group">
          <label htmlFor="adAccountId">Ad Account ID</label>
          <input
            type="text"
            id="adAccountId"
            name="adAccountId"
            value={formData.adAccountId}
            onChange={handleChange}
            required
            placeholder="Enter your Ad Account ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telegramBotToken">Telegram Bot Token</label>
          <input
            type="text"
            id="telegramBotToken"
            name="telegramBotToken"
            value={formData.telegramBotToken}
            onChange={handleChange}
            required
            placeholder="Enter your Telegram Bot Token"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telegramGroupId">Telegram Group ID</label>
          <input
            type="text"
            id="telegramGroupId"
            name="telegramGroupId"
            value={formData.telegramGroupId}
            onChange={handleChange}
            required
            placeholder="Enter your Telegram Group ID"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
          style={{
            backgroundColor: 'var(--tg-theme-button-color)',
            color: 'var(--tg-theme-button-text-color)',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: isSubmitting ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Credentials'}
        </button>
      </form>
    </div>
  );
};