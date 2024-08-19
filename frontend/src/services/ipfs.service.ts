import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_API_KEY,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY,
});

class IpfsService {
  static async uploadFile(file: File, name?: string) {
    try {
      const response = await pinata.upload.file(file, {
        metadata: {
          name,
        },
      });

      return response.IpfsHash;
    } catch (error) {
      console.error(error);
    }
  }

  static async uploadJSON(data: any, name?: string) {
    try {
      const response = await pinata.upload.json(data, {
        metadata: {
          name,
        },
      });

      return response.IpfsHash;
    } catch (error) {
      console.error(error);
    }
  }
}

export default IpfsService;
